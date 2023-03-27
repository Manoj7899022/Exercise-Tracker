import express from 'express'
import * as dotenv from "dotenv";
import userModel from '../models/userModel.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async(req, res) =>{
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const username = req.body.username;

    const newUser = new userModel({username})
        newUser.save()
        .then(()=> res.json('user added'))
        .catch(err => res.status(400).json('Error: '+err))
})

export default router;
