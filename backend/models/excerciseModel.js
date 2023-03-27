import express from 'express'
import mongoose from 'mongoose';

const exercise  = new mongoose.Schema({
    username: { type:String, required:true},
    description : {type:String, required:true},
    duration : { type:Number , required:false},
    date:{type:Date, required:true}
})

const exerciseSchema = mongoose.model('exercise', exercise)

export default exerciseSchema;