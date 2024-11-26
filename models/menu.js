const express = require('express');
const { default: mongoose } = require('mongoose');

const menu = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
    },
    taste : {
      type : String,
      enum : ["sweet","spicy","sour"],
      required : true
    },
    is_drink : {
        type : Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        required: true
    },
    num_sales : {
        type : Number,
        default : 0
    }
})

const MenuItem = mongoose.model('MenuItem',menu)

module.exports = MenuItem