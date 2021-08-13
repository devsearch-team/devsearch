const Seeker = require('../models/seeker')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {addApplication,seekerAccept,seekReject,getSeekerApplications,getSeekerApplication}=require("../utils/applicationsUtils")


const register = function(req, res){
    const newSeeker = new Seeker(req.body)
    //console.log("req is ",req)
    newSeeker.hash_password = bcrypt.hashSync(req.body.password, 10)
    newSeeker.save((err, seeker)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        return res.json({username: seeker.name, jwt: jwt.sign({username: seeker.name, email: seeker.email, id: seeker.id},process.env.SEEKER_SECRET_KEY) })
    })

}

const signIn = function(req,res){
    // console.log("secret key",process.env.SEEKER_SECRET_KEY)
    Seeker.findOne({email: req.body.email}, (err, seeker)=>{
        if(err){
            // console.log("error after sign in")
            res.status(400)
            return res.json({error: err.message})
        }
        if (!seeker || !seeker.comparePassword(req.body.password) ){
            // console.log("authentication failed after sign in")
            res.status(400)
            return res.json({message: "Authentication failed"})
        }
        return res.json({username: seeker.name, jwt: jwt.sign({username: seeker.name, email: seeker.email, id: seeker.id},process.env.SEEKER_SECRET_KEY) })
    })
}

const getSeeker=function(req,res){
    var query=Seeker.findOne({email: req.user.email}).select({ "hash_password": 0})
    query.exec((err, seeker)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        res.send(seeker)
    })  
}



const updateSeeker=function(req,res){
    console.log("dfqeqfreq.user",req.user)
    console.log("req.body",req.body)
    Seeker.findById(req.user.id).exec((err,seeker)=>{
        if (err){
            res.status(404)
            return res.json({error: err.message})
        }
        console.log("seeker inside seeker controller",seeker)})  
    // console.log("req.file",req.file)
    req.file && ( req.body.resumeFile=req.file.location)
    Seeker.findByIdAndUpdate(req.user.id, req.body,{new: true}).exec((err, seeker)=>{
    if (err){
        res.status(404)
        return res.json({error: err.message})
    }
    res.status(200)
    res.send(seeker)
} ) 
}

const newApplication = function(req, res){
   
    addApplication(req).save((err,application)=>{
        if (err){
            res.status(500)
            return res.json({error: err.message})
        }
        console.log("file",req.file)
        
        res.send(application)
    })
}
const seekerApplications=async function(req,res){
    try{
        let applications=await getSeekerApplications(req)
        console.log("inside controller applications are ",applications)
        res.send(applications)
    }
    catch(err){
        res.status(500)
        res.json({error: err.message})
    }
}
const seekerApplication=async function(req,res){
    await doAction(getSeekerApplication,req,res)
}
const seekerProceed=async function(req,res){
    await doAction(seekerAccept, req, res)
}

const seekerReject= async function(req,res){
    await doAction(seekReject,req,res)
}

async function doAction(action, req,res){
    try{
        console.log("inside do action")
        const {application, error} = await action(req)
        console.log("do action application",application)
        console.log("error is ", error)
        if(error){
            res.status(error.status)
            res.send({message: error.message});
        }

        res.send(application);
    }
    catch(err){
        res.status(500)
        return res.json({error: err.message})
    }
}

module.exports = {register,signIn,updateSeeker,getSeeker,newApplication,seekerApplications,seekerApplication,seekerProceed,seekerReject}