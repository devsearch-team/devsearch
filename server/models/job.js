const mongoose=require('mongoose')
const Schema=mongoose.Schema
const normalize=require('normalize-mongoose')
const Job=new Schema({
    employer: {type: Schema.Types.ObjectId, ref: 'Employer'},
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
    },
    minPay:{
        type: String,
    },
    maxPay:{
        type: String
    },
    category:{
        type: String
    },
    description:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    modified_at: {
        type: Date,
        required: true
    }
})


module.exports=mongoose.model('Job',Job)