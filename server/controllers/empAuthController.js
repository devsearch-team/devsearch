const Employer = require('../models/employer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {empAccept,empReject,getEmpApplications}=require("../utils/applicationsUtils")


const register = function(req, res){
    const newEmployer = new Employer(req.body)
    //console.log("bode is ",req)
    newEmployer.hash_password = bcrypt.hashSync(req.body.password, 10)
    newEmployer.save((err, employer)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        return res.json({username: employer.name, jwt: jwt.sign({username: employer.name, email: employer.email, id: employer.id},process.env.EMPLOYER_SECRET_KEY) })
    })

}

const signIn = function(req,res){
    console.log("secret key",process.env.EMPLOYER_SECRET_KEY)
    Employer.findOne({email: req.body.email}, (err, employer)=>{
        if(err){
            console.log("error after sign in")
            res.status(400)
            return res.json({error: err.message})
        }
        if (!employer || !employer.comparePassword(req.body.password) ){
            console.log("authentication failed after sign in")
            res.status(400)
            return res.json({message: "Authentication failed"})
        }
        return res.json({username: employer.name, jwt: jwt.sign({username: employer.name, email: employer.email, id: employer.id},process.env.EMPLOYER_SECRET_KEY) })
    })
}

const getEmployer=function(req,res){
        var query=Employer.findOne({email: req.user.email}).select({ "hash_password": 0})
        query.exec((err, employer)=>{
            if(err){
                res.status(400)
                return res.json({error: err.message})
            }
            res.send(employer)
        })  
    }

   

const updateEmployer=function(req,res){
    console.log("req.user.id",req.user.id)
    Employer.findByIdAndUpdate(req.user.id, req.body,{new: true}).exec((err, employer)=>{
        if (err){
            res.status(404)
            return res.json({error: err.message})
        }
        res.status(200)
        res.send(employer)
    } ) 
}
   
const empApplications=async function(req,res){
    try{
        let applications=await getEmpApplications(req)
        console.log("inside controller applications are ",applications)
        res.send(applications)
    }
    catch(err){
        res.status(500)
        res.json({error: err.message})
    }
}

const employerProceed=async function(req,res){
   await doAction(empAccept, req,res);
}

const employerReject= async function(req,res){
    await doAction(empReject,req,res)
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
      
module.exports = {register,signIn,getEmployer,updateEmployer,employerProceed,employerReject,empApplications}

// 