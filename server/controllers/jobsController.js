const Job = require('../models/job')
const {getAllJobs, addJob,updateJob,getJobById,getEmployerJobs} = require('../utils/jobsUtils')

const getJobs = async function (req, res){
    try{
        const {jobs, totalPages}= await getAllJobs(req)
        console.log("totalPages",totalPages)
        res.send({jobs, totalPages})}
    catch(err){
        res.status(500)
        return res.json({error: err.message})
    }    
}

const getJobsByEmployer=async function(req,res){
    try{
        const {jobs, totalPages} = await getEmployerJobs(req)
        res.send({jobs, totalPages});
    }
    catch(err){
        res.status(500)
        return res.json({error: err.message})
    }
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
        }else if(!job){
            return res.status(404).json({error:"Record not found"})
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
        //console.log("company name ",job.employer.name)
        // {...job, companyName: job.employer.name}
        res.send(job)
    })
}


module.exports = {getJobs, newJob, getJob, changeJob,getJobsByEmployer}