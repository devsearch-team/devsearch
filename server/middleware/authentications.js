require('dotenv').config()
const jwt = require('jsonwebtoken')

const empLoginRequired=(req, res, next) => {
    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization.split(' ')[1],process.env.EMPLOYER_SECRET_KEY,(err, decode)=>{
            if (err) {
                return res.status(403).json({message: "Unauthorized operation"})
            }else{
                req.user = decode
            }
             
            next()
        })
    }else{
        res.status(401).json({message: "Unauthorized operation"})
    }
}

const seekerLoginRequired=(req, res, next) => {
    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization.split(' ')[1],process.env.SEEKER_SECRET_KEY,(err, decode)=>{
            if (err) {
                return res.sendStatus(403).json({message: "Unauthorized operation"})
            }else{
                req.user = decode
            }
             console.log("inside seeker login required user is",req.user)
            next()
        })
    }else{
        res.status(401).json({message: "Unauthorized operation"})
    }
}

module.exports ={empLoginRequired,seekerLoginRequired}