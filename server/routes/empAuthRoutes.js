const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()
const {empLoginRequired}=require('../middleware/authentications')
const {register,signIn,getEmployer,updateEmployer,employerProceed,employerReject,empApplications} = require('../controllers/empAuthController')


router.post('/auth/register', register)
router.post('/auth/signin', signIn)
router.get('/profile',empLoginRequired, getEmployer)
router.put('/profile',empLoginRequired,updateEmployer)
router.post('/empaccept/:id',empLoginRequired,employerProceed )
router.post('/empreject/:id',empLoginRequired,employerReject )
router.get('/applications',empLoginRequired,empApplications )
module.exports = router