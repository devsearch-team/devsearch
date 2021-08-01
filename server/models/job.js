const mongoose=require('mongoose')
const Schema=mongoose.Schema
const normalize=require('normalize-mongoose')
const bcrypt = require('bcrypt')
const Employer = require('../models/employer')
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
    about:{
         type: String
        },
    description:{
        type: String,
        required: true
    },
    requirements:{type:String},
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