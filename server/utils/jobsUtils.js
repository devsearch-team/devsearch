const Job = require('../models/job')

const getAllJobs = function (req) {
    const page = parseInt(req.query.page, 10) || 0
    const limit = parseInt(req.query.limit, 10) || 10

    const params = {
        $text: req.query.search ? { $search: req.query.search } : undefined, // full text search index
        category: req.query.category,
        location: req.query.location,
    }
    const findArgs = Object.fromEntries(Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== '') //remove unused keys
        .map(([k, v]) => {
            if(k === '$text') return [k,v] // ignore case insensetive for index search
            return [k, { $regex: v, $options: 'i' }] // case insensetive 
        })
    )
    console.log(findArgs);


    const jobs = Job.find(findArgs)
        .skip(page * limit)
        .limit(limit).populate("employer")

    return jobs
}

const getEmployerJobs = function (req) {
    const page = parseInt(req.query.page, 10) || 0
    const limit = parseInt(req.query.limit, 10) || 10
    const jobs = Job.find({ employer: req.user.id })
        .skip(page * limit)
        .limit(limit)
    return jobs
}

const getJobById = function (id) {
    return Job.findById(id).populate("employer")
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
    filter = { _id: req.params.id, employer: req.user.id }
    return Job.findOneAndUpdate(filter, req.body, { new: true })
}

const checkEmpOwnership = (req, res, next) => {

}
module.exports = { getAllJobs, addJob, updateJob, getJobById, getEmployerJobs }