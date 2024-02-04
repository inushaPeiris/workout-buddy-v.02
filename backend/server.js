require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const workoutRoutes = require('./routes/workouts')

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

app.use('/api/workouts', workoutRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
