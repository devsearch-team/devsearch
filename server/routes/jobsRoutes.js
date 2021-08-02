const express = require('express')
const router = express.Router()
const {getJobs, newJob, getJob, changeJob,getJobsByEmployer}=require("../controllers/jobsController")
const {empLoginRequired,seekerLoginRequired} = require('../middleware/authentications')


//employer login needed
router.post('/',empLoginRequired, newJob)
router.put('/:id', empLoginRequired,changeJob) 
router.get('/myjobs',empLoginRequired,getJobsByEmployer)

//
router.get('/', getJobs)
router.get('/:id', getJob)


module.exports = router