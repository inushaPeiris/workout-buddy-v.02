const express = require('express')
const router = express.Router() //enable specifying router logic in another file.
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// get all workouts
router.get('/', getWorkouts)

// get a selected workout
router.get('/:id', getWorkout)

// post a new workout
router.post('/', createWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

// update workout
router.patch('/:id', updateWorkout)

module.exports = router