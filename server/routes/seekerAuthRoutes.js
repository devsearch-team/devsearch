const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()
const parser = require("../middleware/S3.config");
const {seekerLoginRequired}=require('../middleware/authentications')
const {register,signIn,getSeeker,updateSeeker,newApplication,seekerApplications,seekerApplication,seekerProceed,seekerReject} = require('../controllers/seekerAuthController')



router.post('/auth/register', register)
router.post('/auth/signin', signIn)
router.get('/profile',seekerLoginRequired, getSeeker)
router.put('/profile',seekerLoginRequired,parser.single("resumeFile"),updateSeeker)

router.post('/applications',seekerLoginRequired,parser.single("coverLetter"),newApplication )
router.get('/applications',seekerLoginRequired,seekerApplications )
router.get('/applications/:id',seekerLoginRequired,seekerApplication )
router.post('/seekeraccept/:id',seekerLoginRequired,seekerProceed)
router.post('/seekerreject/:id',seekerLoginRequired,seekerReject)
module.exports = router