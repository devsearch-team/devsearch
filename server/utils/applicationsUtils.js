const application = require('../models/application')
const Application = require('../models/application')

 const SUBMITTED = 'SUBMITTED';
 const WITHDRAWN = 'WITHDRAWN';
 const REJECTED = 'REJECTED';
 const APPROVED_FOR_INTERVIEW = 'APPROVED_FOR_INTERVIEW';
 const SCHEDEULED_FOR_INTERVIEW = 'SCHEDEULED_FOR_INTERVIEW';
 const OFFER_MADE = 'OFFER_MADE';
 const OFFER_ACCEPTED = 'OFFER_ACCEPTED';
 const HIRED = 'HIRED'

 const seekerWorkflow = {
    [SUBMITTED]: { canWithdraw: true },
    [APPROVED_FOR_INTERVIEW]: { canWithdraw: true, next: SCHEDEULED_FOR_INTERVIEW },
    [SCHEDEULED_FOR_INTERVIEW]: { canWithdraw: true },
    [OFFER_MADE]: { canWithdraw: true, next: OFFER_ACCEPTED },
    [OFFER_ACCEPTED]: { canWithdraw: true },
    [HIRED]: { canWithdraw: false },
    [WITHDRAWN]: { canWithdraw: false },
    [REJECTED]: { canWithdraw: false }
}

 const employerWorkflow = {
    [SUBMITTED]: { canReject: true, next: APPROVED_FOR_INTERVIEW },
    [APPROVED_FOR_INTERVIEW]: { canReject: false },
    [SCHEDEULED_FOR_INTERVIEW]: { canReject: true, next: OFFER_MADE },
    [OFFER_MADE]: { canReject: false },
    [OFFER_ACCEPTED]: { canReject: false, next: HIRED },
    [HIRED]: { canReject: false },
    [WITHDRAWN]: { canReject: false },
    [REJECTED]: { canReject: false }
}

const addApplication=function(req){
    req.body.seeker = req.user.id
    req.body.currentStage=SUBMITTED
    req.file && ( req.body.coverLetter=req.file.location)
    req.body.stages={}
    req.body.stages[SUBMITTED]={actionDate:new Date()}
  // console.log("inside add app req.body",req.body)
    return Application(req.body)
}

const empAccept=async function(req){
    let application=await Application.findOne({_id: req.params.id,employer: req.user.id}).populate("employer",{"hash_password":0}).populate("seeker",{"hash_password":0})
    if(!employerWorkflow[application.currentStage].next) return
    const nextStage=employerWorkflow[application.currentStage].next
    application.stages[nextStage]={actionDate: new Date(),...req.body}
    application.markModified("stages");
    application.currentStage=nextStage
    const res = await application.save()
    // console.log("res", res);
    // application=await Application.findOne({_id: req.params.id,employer: req.user.id})
    // console.log("Application after save", application);
    return res
}
module.exports={addApplication,empAccept}