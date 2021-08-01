const express = require('express')
const router = express.Router()
const {getJobs, newJob, getJob, changeJob}=require("../controllers/jobsController")
const {empLoginRequired,seekerLoginRequired} = require('../middleware/authentications')

router.get('/', getJobs)
router.get('/:id', getJob)

//employer
router.post('/',empLoginRequired, newJob)
router.put('/:id', empLoginRequired,changeJob)
module.exports = router