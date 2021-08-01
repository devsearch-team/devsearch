const Seeker = require('../models/seeker')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = function(req, res){
    const newSeeker = new Seeker(req.body)
    console.log("req is ",req)
    newSeeker.hash_password = bcrypt.hashSync(req.body.password, 10)
    newSeeker.save((err, seeker)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        return res.json({username: seeker.name, jwt: jwt.sign({username: seeker.name, email: seeker.email, _id: seeker.id},process.env.SEEKER_SECRET_KEY) })
    })

}

const signIn = function(req,res){
    console.log("secret key",process.env.SEEKER_SECRET_KEY)
    Seeker.findOne({email: req.body.email}, (err, seeker)=>{
        if(err){
            console.log("error after sign in")
            res.status(400)
            return res.json({error: err.message})
        }
        if (!seeker || !seeker.comparePassword(req.body.password) ){
            console.log("authentication failed after sign in")
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
    // console.log("req.body",req.body)
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

const loginRequired = function(req,res, next){
    if(req.user){
        next()
    }else{
        console.log("req.user",req.user)
        return res.status(401).json({message: "Unauthorized operation"})
    }
}

module.exports = {register,signIn,updateSeeker,getSeeker,loginRequired}