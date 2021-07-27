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

module.exports = {register,signIn}