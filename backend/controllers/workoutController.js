const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
const connect = require("../db");

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
  const { id } = req.params;

  try {
    // Query the database to get the workout with the provided ID
    const query = "SELECT * FROM your_table WHERE id = ?";
    const workout = await connect.connection.query(query, [id]);

    // Check if the workout with the provided ID exists
    if (workout.length === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Send the workout data in the response
    res.status(200).json(workout);
  } catch (error) {
    console.error("Error retrieving workout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// post a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    // pause the function untill database operation is done
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
