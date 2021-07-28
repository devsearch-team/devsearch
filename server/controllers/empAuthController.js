const Employer = require('../models/employer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = function(req, res){
    const newEmployer = new Employer(req.body)
    //console.log("bode is ",req)
    newEmployer.hash_password = bcrypt.hashSync(req.body.password, 10)
    newEmployer.save((err, employer)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        return res.json({username: employer.name, jwt: jwt.sign({username: employer.name, email: employer.email, _id: employer.id},process.env.SECRET_KEY) })
    })

}

const signIn = function(req,res){
    Employer.findOne({email: req.body.email}, (err, employer)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        if (!employer || !employer.comparePassword(req.body.password) ){
            res.status(400)
            return res.json({message: "Authentication failed"})
        }
        return res.json({username: employer.name, jwt: jwt.sign({username: employer.name, email: employer.email, id: employer.id},"secret") })
    })
}

// const getEmployer=function(req,res){
//     var query=Employer.findOne({email: req.body.email}).select({ "name": 1, "_id": 0})
//     Employer.findOne({email: req.user.email}, (err, employer)=>{
//         if(err){
//             res.status(400)
//             return res.json({error: err.message})
//         }
//         res.send(employer)
//     })  
// }
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
    
}  

    const loginRequired = function(req,res, next){
        if(req.user){
            next()
        }else{
            return res.status(401).json({message: "Unauthorized operation"})
        }
    }

    
      
module.exports = {register,signIn,getEmployer,loginRequired}

// 