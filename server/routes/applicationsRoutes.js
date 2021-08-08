const express = require('express')
const router = express.Router()
const parser = require("../middleware/S3.config");

// const {empLoginRequired,seekerLoginRequired} = require('../middleware/authentications')
// const {newApplication,employerProceed,employerReject,seekerProceed,seekerReject,empApplications}=require("../controllers/applicationsController")


// router.post('/',seekerLoginRequired,parser.single("coverLetter"),newApplication )
// router.post('/seekeraccept/:id',seekerLoginRequired,seekerProceed)
// router.post('/seekerreject/:id',seekerLoginRequired,seekerReject)

// router.post('/empaccept/:id',empLoginRequired,employerProceed )
// router.post('/empreject/:id',empLoginRequired,employerReject )
// router.get('/employer/applications',empLoginRequired,empApplications )


module.exports = router