const connect = require("../db");

// ------ to be removed
// const Workout = require("../models/workoutModel");
// const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  connect.connection.query("SELECT * FROM exercises", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    // console.log('Query results:', results);
    res.status(200).json(results);
  });
};

const getWorkout = async (req, res) => {
  const exerciseId = req.params.id; // Extracting exercise ID from URL parameter

  // Query database to get exercise with the specified ID
  connect.connection.query(
    "SELECT * FROM exercises WHERE id = ?",
    [exerciseId],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      // Check if exercise with the given ID exists
      if (result.length === 0) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }

      // Return the exercise
      res.status(200).json(result[0]);
    }
  );
};

// post a new workout
const createWorkout = async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  const { title, weight, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // Insert new workout into the database
  connect.connection.query(
    "INSERT INTO exercises (title, weight,reps) VALUES (?, ?, ?)",
    [title, weight, reps],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      const workout = { id: result.insertId, title, weight, reps }; // get the data of new workout
      res.status(200).json(workout);
    }
  );
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id }); //_id = mongoDB keyword for object id

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // avoid directly modifying the req.body
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
