const Application=require("../models/application")
const {addApplication,empAccept}=require("../utils/applicationsUtils")

const newApplication = function(req, res){
   
    addApplication(req).save((err,application)=>{
        if (err){
            res.status(500)
            return res.json({error: err.message})
        }
        console.log("file",req.file)
        
        res.send(application)
    })
}

const employerProceed=async function(req,res){
    try{
        const application = await empAccept(req)
        res.send(application);
    }
    catch(err){
        res.status(500)
        return res.json({error: err.message})
    }
}

module.exports = {newApplication,employerProceed}