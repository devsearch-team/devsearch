const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Application=new Schema({
    seeker:{type: Schema.Types.ObjectId, ref: 'Seeker'},
    employer:{type: Schema.Types.ObjectId, ref: 'Employer'},
    job:{type: Schema.Types.ObjectId, ref: 'Job'},
    stages:{} ,
    currentStage: {
        type: String,
        required: true
    },
    coverLetter:{
        type:String
    }
})

module.exports=mongoose.model('Application',Application)