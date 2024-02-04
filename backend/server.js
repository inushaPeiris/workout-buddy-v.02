require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require('./routes/workouts')

const app = express();

// Enable CORS
app.use(cors());

app.use('/api/workouts', workoutRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
