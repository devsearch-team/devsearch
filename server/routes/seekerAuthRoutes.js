const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()
const parser = require("../middleware/S3.config");
const {seekerLoginRequired}=require('../middleware/authentications')
const {register,signIn,getSeeker,updateSeeker} = require('../controllers/seekerAuthController')

router.post('/auth/register', register)
router.post('/auth/signin', signIn)
router.get('/profile',seekerLoginRequired, getSeeker)
router.put('/profile',seekerLoginRequired,parser.single("resumeFile"),updateSeeker)
module.exports = router