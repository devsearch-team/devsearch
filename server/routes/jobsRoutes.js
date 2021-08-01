const express = require('express')
const router = express.Router()
const {getJobs, newJob, getJob, changeJob}=require("../controllers/jobsController")
const {empLoginRequired} = require('../controllers/empAuthController')

router.get('/', getJobs)
router.get('/:id', getJob)

//employer
router.post('/', newJob)
router.put('/:id', changeJob)
module.exports = router