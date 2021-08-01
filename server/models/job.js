const mongoose=require('mongoose')
const Schema=mongoose.Schema
const normalize=require('normalize-mongoose')
const bcrypt = require('bcrypt')

const Job=new Schema({
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
    },
    minPay:{
        type: String,
        required: true
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
        type: String
    },
    requirements:{type:String},
})


module.exports=mongoose.model('Job',Job)