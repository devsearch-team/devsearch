const express = require('express')
const router = express.Router()
const parser = require("../middleware/S3.config");

const {empLoginRequired,seekerLoginRequired} = require('../middleware/authentications')
const {newApplication,employerProceed}=require("../controllers/applicationsController")


router.post('/',seekerLoginRequired,parser.single("coverLetter"),newApplication )
router.post('/empaccept/:id',empLoginRequired,employerProceed )

module.exports = router