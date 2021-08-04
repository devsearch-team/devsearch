const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()
const parser = require("../middleware/S3.config");
const {seekerLoginRequired}=require('../middleware/authentications')
const {register,signIn,getSeeker,updateSeeker} = require('../controllers/seekerAuthController')

//if the employer is logged in, add user to req 
// router.use((req, res, next) => {
//     if(req.headers && req.headers.authorization){
//         jwt.verify(req.headers.authorization.split(' ')[1],process.env.SEEKER_SECRET_KEY,(err, decode)=>{
//             if (err) {
//                 req.user = undefined
//             }else{
//                 req.user = decode
//             }
             
//             next()
//         })
//     }else{
//         req.user = undefined
//         //console.log("req.headers",req.headers)
//         next()
//     }
// })

router.post('/auth/register', register)
router.post('/auth/signin', signIn)
router.get('/profile',seekerLoginRequired, getSeeker)
router.put('/profile',seekerLoginRequired,parser.single("resumeFile"),updateSeeker)
module.exports = router