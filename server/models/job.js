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
        type: Schema.Types.ObjectId, ref: 'Category'
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
    }
})
Job.index({'$**': 'text'});


module.exports=mongoose.model('Job',Job)