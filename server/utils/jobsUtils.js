const Job = require('../models/job')

const getAllJobs = function (req) {
    const page = parseInt(req.query.page, 10) || 0
    const limit = parseInt(req.query.limit, 10) || 10
    const jobs = Job.find()
            .skip(page * limit)
            .limit(limit)
    return jobs
}

const getJobById = function (id){
    return Job.findById(id)
}

const addJob = function (req) {
    // console.log("add job req.body",req.body)
    let date = Date.now()
    req.body.employer = req.user.id
    req.body.created_at = date
    req.body.modified_at = date
    return Job(req.body)
}

const updateJob = function (req) {
    req.body.modified_at = Date.now()
    return Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
}
module.exports = { getAllJobs, addJob,updateJob,getJobById }