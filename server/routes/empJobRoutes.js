const express = require('express')
const router = express.Router()
const {getJobs, newJob, getJob, changeJob}=require("../controllers/jobsController")
const {empLoginRequired,seekerLoginRequired} = require('../middleware/authentications')

router.post('/', newJob)
router.put('/:id', changeJob)
module.exports = router