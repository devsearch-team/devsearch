const mongoose=require('mongoose')
const Schema=mongoose.Schema
const normalize=require('normalize-mongoose')
const bcrypt = require('bcrypt')

const Employer=new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    hash_password:{
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    website:{
        type: String
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    postcode:{
        type: String
    },
    country:{
        type: String
    },
    about:{
         type: String
        },
    facebook:{type:String},
    instagram:{ type: String},
    twitter:{ type: String},
    other:{ type: String}
})

Employer.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password)
}
module.exports=mongoose.model('Employer',Employer)