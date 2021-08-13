const { ApplicationAutoScaling } = require('aws-sdk');
const application = require('../models/application')
const Application = require('../models/application')

 const SUBMITTED = 'SUBMITTED';
 const WITHDRAWN = 'WITHDRAWN';
 const REJECTED = 'REJECTED';
 const APPROVED_FOR_INTERVIEW = 'APPROVED_FOR_INTERVIEW';
 const SCHEDEULED_FOR_INTERVIEW = 'SCHEDEULED_FOR_INTERVIEW';
 const OFFER_MADE = 'OFFER_MADE';
 //const OFFER_ACCEPTED = 'OFFER_ACCEPTED';
 const HIRED = 'HIRED'

 const seekerWorkflow = {
    [SUBMITTED]: { canWithdraw: true },
    [APPROVED_FOR_INTERVIEW]: { canWithdraw: true, next: SCHEDEULED_FOR_INTERVIEW },
    [SCHEDEULED_FOR_INTERVIEW]: { canWithdraw: true },
    [OFFER_MADE]: { canWithdraw: true, next: HIRED },
    // [OFFER_ACCEPTED]: { canWithdraw: true },
    [HIRED]: { canWithdraw: false },
    [WITHDRAWN]: { canWithdraw: false },
    [REJECTED]: { canWithdraw: false }
}

 const employerWorkflow = {
    [SUBMITTED]: { canReject: true, next: APPROVED_FOR_INTERVIEW },
    [APPROVED_FOR_INTERVIEW]: { canReject: false },
    [SCHEDEULED_FOR_INTERVIEW]: { canReject: true, next: OFFER_MADE },
    [OFFER_MADE]: { canReject: false },
    // [OFFER_ACCEPTED]: { canReject: false, next: HIRED },
    [HIRED]: { canReject: false },
    [WITHDRAWN]: { canReject: false },
    [REJECTED]: { canReject: false }
}

//employer actions------------------------------------------------------------

const getEmpApplications=async function(req){
    //console.log("user id is ",req.user.id)
    let applications =  Application.find({employer: req.user.id}).populate("job").populate("seeker",{"hash_password":0}).populate("employer",{"hash_password":0})
    if(req.query.currentStage){
        applications.where('currentStage').equals(req.query.currentStage)
    }
    return await applications;
}


const getEmployerApplication=async function(req){
    let application =await setEmpApp(req)
    if (validateEmpApp(application)) return validateEmpApp(application)
    return {application}
}
const empAccept=async function(req){
    let application=await setEmpApp(req)
    if (validateEmpApp(application)) return validateEmpApp(application)
    if(!employerWorkflow[application.currentStage].next){//validates the application can proceed by the employer at this stage
        return {error: {status: 403, message: 'action not allowed'}}
    }
    const nextStage=employerWorkflow[application.currentStage].next
    application.stages[nextStage]={actionDate: new Date(),...req.body}
    application.markModified("stages")
    application.currentStage=nextStage
    await application.save()
    // console.log("res", res);
    // application=await Application.findOne({_id: req.params.id,employer: req.user.id})
    console.log("Application after save", application);
    return {application: application}
}

const empReject=async function(req){
    let application=await setEmpApp(req)
    if (validateEmpApp(application)) return validateEmpApp(application)
    if(!employerWorkflow[application.currentStage].canReject){//validates the application can be rejected by the employer at this stage
        return {error: {status: 403, message: 'action not allowed'}}
    }
    application.stages[REJECTED]={actionDate: new Date(),...req.body}
    application.currentStage=REJECTED
    application.markModified("stages")
    await application.save()
    return {application: application}
}
//seeker actions------------------------------------------------------------

const addApplication=function(req){
    req.body.seeker = req.user.id
    req.body.currentStage=SUBMITTED
    req.file && ( req.body.coverLetter=req.file.location)
    req.body.stages={}
    req.body.stages[SUBMITTED]={actionDate:new Date()}
  // console.log("inside add app req.body",req.body)
    return Application(req.body)
}

const getSeekerApplications=async function(req){
    //console.log("user id is ",req.user.id)
    let applications =  Application.find({seeker: req.user.id}).populate("job").populate("employer",{"hash_password":0}).populate("seeker",{"hash_password":0})
    if(req.query.currentStage){
        applications.where('currentStage').equals(req.query.currentStage)
    }
    return await applications;
}

const getSeekerApplication=async function(req){
    let application = setseekerApp(req)
    if (validateSeekerApp(application)) return validateSeekerApp(application)
    return {application}
}
const seekerAccept=async function(req){
    let application=await setseekerApp(req)
    if (validateSeekerApp(application)) return validateSeekerApp(application) 
    if(!seekerWorkflow[application.currentStage].next) {//validates the seeker can proceed at this stage
        console.log("seeker can withdraw? ",seekerWorkflow[application.currentStage].canWithdraw)
        return {error: {status: 403, message: 'action not allowed'}}
    } 
    const nextStage=seekerWorkflow[application.currentStage].next
    application.stages[nextStage]={actionDate: new Date(),...req.body}
    application.markModified("stages")
    application.currentStage=nextStage
    const res = await application.save()
     console.log("res", res);
    // application=await Application.findOne({_id: req.params.id,employer: req.user.id})
    // console.log("Application after save", application);
    return {application: application}
}
const seekReject=async function(req){
    let application=await setseekerApp(req)
    if (validateSeekerApp(application)) return validateSeekerApp(application) //validates the application exists
    if(!seekerWorkflow[application.currentStage].canWithdraw) {//validates the seeker can withdraw at this stage
        //console.log("seeker can withdraw? ",seekerWorkflow[application.currentStage].canWithdraw)
        return {error: {status: 403, message: 'action not allowed'}}
    } 
      application.stages[REJECTED]={actionDate: new Date(),...req.body}
    application.currentStage=REJECTED
    // application.stages[WITHDRAWN]={actionDate: new Date(),...req.body}
    // application.currentStage=WITHDRAWN
    application.markModified("stages")
    await application.save()
    return {application: application}
}


/// utils------------------------------------------------------

//finds application by url id and the logged in employer id
async function setEmpApp(req){
    let application= Application.findOne({_id: req.params.id,employer: req.user.id}).populate("employer",{"hash_password":0}).populate("seeker",{"hash_password":0}).populate("job")
    return application
}
//finds application by url id and the logged in seeker id
async function setseekerApp(req){
    let application= Application.findOne({_id: req.params.id,seeker: req.user.id}).populate("employer",{"hash_password":0}).populate("seeker",{"hash_password":0}).populate("job")
    return application
}

function validateEmpApp(application){
    if(!application){//validate application exist in the database and belonges to the employer
        return {error: {status: 401, message: 'Application not found'}}
    }
    else{
        return false
    }
}

function validateSeekerApp(application){
    if(!application){//validate application exist in the database and belonges to the seeker
        return {error: {status: 401, message: 'Application not found'}}
    } 
    else{
        return false
    }
}

module.exports={addApplication,empAccept,empReject,seekerAccept,seekReject,getEmpApplications,getEmployerApplication,getSeekerApplications,getSeekerApplication}