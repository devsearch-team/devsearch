const Application=require("../models/application")
const {addApplication,seekerAccept,seekReject,empAccept,empReject,getEmpApplications}=require("../utils/applicationsUtils")

// const newApplication = function(req, res){
   
//     addApplication(req).save((err,application)=>{
//         if (err){
//             res.status(500)
//             return res.json({error: err.message})
//         }
//         console.log("file",req.file)
        
//         res.send(application)
//     })
// }

// const empApplications=async function(req,res){
//     try{
//         let applications=await getEmpApplications(req)
//         console.log("inside controller applications are ",applications)
//         res.send(applications)
//     }
//     catch(err){
//         res.status(500)
//         res.json({error: err.message})
//     }
// }

// const employerProceed=async function(req,res){
//    await doAction(empAccept, req,res);
// }

// const employerReject= async function(req,res){
//     await doAction(empReject,req,res)
// }

// const seekerProceed=async function(req,res){
//     await doAction(seekerAccept, req, res)
// }

// const seekerReject= async function(req,res){
//     await doAction(seekReject,req,res)
// }

// async function doAction(action, req,res){
//     try{
//         console.log("inside do action")
//         const {application, error} = await action(req)
//         console.log("do action application",application)
//         console.log("error is ", error)
//         if(error){
//             res.status(error.status)
//             res.send({message: error.message});
//         }

//         res.send(application);
//     }
//     catch(err){
//         res.status(500)
//         return res.json({error: err.message})
//     }
// }
// module.exports = {newApplication,seekerProceed,seekerReject}