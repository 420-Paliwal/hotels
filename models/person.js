const mongoose = require('mongoose');

const personSchemas = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum : ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type: Number,
        unique:true,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required:true
    }
})

const person = mongoose.model('Person',personSchemas);
module.exports = person;