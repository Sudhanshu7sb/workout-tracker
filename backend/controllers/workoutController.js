const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}
// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found!" })
    }


    const singleWorkout = await Workout.findById(id);

    if (!singleWorkout) {
        res.status(400).json({ error: "No such workout found" })
    }


    res.status(200).json(singleWorkout);
}
// create a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    let emptyFields = [];


    if (!title) {
        emptyFields.push("title");
    }
    if (!reps) {
        emptyFields.push("reps");
    }
    if (!load) {
        emptyFields.push("load");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found!" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!workout) {
        res.status(400).json({ error: "No such workout found" })
    }


    res.status(200).json(workout);
}
// delete  workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found!" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        res.status(400).json({ error: "No such workout found" })
    }


    res.status(200).json(workout);
}


module.exports = { createWorkout, getWorkouts, getSingleWorkout, updateWorkout, deleteWorkout };