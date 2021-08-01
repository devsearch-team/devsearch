const Job = require('../models/job')
const {getAllJobs, addJob,updateJob,getJobById} = require('../utils/jobsUtils')

const getJobs = function (req, res){
    getAllJobs(req).exec((err, jobs)=>{
        if (err){
            res.status(500)
            return res.json({error: err.message})
        } 
        res.send(jobs)
    })
}

const newJob = function (req, res){
    console.log("add job req.body",req.body)
    addJob(req).save((err, job)=>{
        if (err){
            res.status(500)
            return res.json({error: err.message})
        }
        res.send(job)
    })
}

const changeJob = function(req,res){
    updateJob(req).exec((err, job)=>{
        if (err){
            res.status(404)
            return res.json({error: err.message})
        }
        res.status(200)
        res.send(job)
    })
}

const getJob = function (req, res){
    getJobById(req.params.id).exec((err, job)=>{
        if (err){
            res.status(404)
            return res.json({error: err.message})
        } 
        res.send(job)
    })
}

module.exports = {getJobs, newJob, getJob, changeJob}