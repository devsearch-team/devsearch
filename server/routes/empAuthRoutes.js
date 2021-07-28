const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()

const {register,signIn,getEmployer,loginRequired} = require('../controllers/empAuthController')

//if the employer is logged in, add user to req 
router.use((req, res, next) => {

    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization.split(' ')[1],process.env.EMPLOYER_SECRET_KEY,(err, decode)=>{
            if (err) {
                req.user = undefined
            }else{
                req.user = decode
            }
            // console.log("req.user",req.user)
            console.log("req.headers",req.headers)
            next()
        })
    }else{
        req.user = undefined
        console.log("req.headers",req.headers)
        next()
    }
})

router.post('/register', register)
router.post('/signin', signIn)
router.get('/profile',loginRequired, getEmployer)
module.exports = router