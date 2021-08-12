const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()
const parser = require("../middleware/S3.config");
const {empLoginRequired}=require('../middleware/authentications')
const {register,signIn,getEmployer,updateEmployer,employerProceed,employerReject,empApplications,empApplication} = require('../controllers/empAuthController')


router.post('/auth/register', register)
router.post('/auth/signin', signIn)
router.get('/profile',empLoginRequired, getEmployer)
router.put('/profile',empLoginRequired,updateEmployer)
router.post('/empaccept/:id',empLoginRequired,parser.single("contract"),employerProceed )
router.post('/empreject/:id',empLoginRequired,employerReject )
router.get('/applications',empLoginRequired,empApplications )
router.get('/applications/:id',empLoginRequired,empApplication )
module.exports = router