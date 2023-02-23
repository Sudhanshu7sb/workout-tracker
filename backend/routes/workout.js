const express = require("express");
const { createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");
const router = express.Router();
const Workout = require("../models/Workout");
const requireAuth = require("../middlewares/requireAuth")


router.use(requireAuth);

// get all workouts
router.get("/", getWorkouts)

// post a new workout
router.post("/", createWorkout)

// get single workout
router.get("/:id", getSingleWorkout)

// update  workout
router.patch("/:id", updateWorkout)

// delete single workout
router.delete("/:id", deleteWorkout)

module.exports = router;