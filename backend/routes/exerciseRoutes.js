import express from 'express'
import * as dotenv from "dotenv";
import excerciseSchema from '../models/excerciseModel.js'

dotenv.config();

const router1 = express.Router();

router1.route('/').get((req, res) =>{
    excerciseSchema.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: '+err))
})

router1.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new excerciseSchema({
        username,
        description,
        duration,
        date
    })
        newExercise.save()
        .then(()=> res.json('user added'))
        .catch(err => res.status(400).json('Error: '+err))
})

router1.route('/:id').get((req,res) => {
    excerciseSchema.findById(req.params.id)
                    .then(exercise => res.json(exercise))
                    .catch(err => res.status(400).json('Error: '+ err))
})

router1.route('/:id').delete((req,res) => {
    excerciseSchema.findByIdAndDelete(req.params.id)
                    .then(() => res.json('Exercise deleted'))
                    .catch(err => res.status(400).json('Error: '+ err))
})

router1.route('/update/:id').post((req,res) => {
    excerciseSchema.findById(req.params.id)
                    .then(exercise => {
                        exercise.username = req.body.username;
                        exercise.description = req.body.description;
                        exercise.duration =Number(req.body.duration);
                        exercise.date = Date.parse(req.body.date);

                        exercise.save()
                        .then(()=> res.json('Exercise updated!'))
                        .catch(err => res.status(400).json('Error: '+ err))
                    })
                    .catch(err => res.status(400).json('Error: '+ err))
        })

export default router1;



