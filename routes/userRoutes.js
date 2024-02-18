const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");

// get created user
router.post("/", async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.create({
      username,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all users
router.get("/", async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    // 500 status code refers to server error, in other words it's developer fault
    res.status(500).json({ message: err.message });
  }
});

// create exercise
router.post("/:_id/exercises", async function (req, res) {
  const { description, duration, date } = req.body;
  const paramsId = req.params._id;

  try {
    // find the user
    const user = await User.findById(paramsId);

    if (user == null) {
      res.status(400).json({
        message: "user not found",
      });
    }

    // create the exercise
    const exercise = new Exercise({
      _userId: user._id,
      description,
      duration,
      date: date ? new Date(date).toDateString() : new Date().toDateString(),
    });

    const savedExercise = await exercise.save();

    res.status(201).json({
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date,
      _id: user._id,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// get all exercises by a user
router.get("/:_id/logs", async function (req, res) {
  const paramsId = req.params._id;
  const _from = req.query.from;
  const _to = req.query.to;
  const _limit = req.query.limit;

  const start_date_timestamp = new Date(_from).getTime();
  const end_date_timestamp = new Date(_to).getTime();

  try {
    const user = await User.findById(paramsId);

    if (user == null) {
      res.status(400).json({
        message: "user not found",
      });
    }

    const exercices = await Exercise.find({ _userId: user._id })
      .exec()
      .then((exercices) => {
        const formatedExercisesDate = exercices.filter((ex) => {
          if (end_date_timestamp && start_date_timestamp) {
            return (
              new Date(start_date_timestamp) <= new Date(ex.date) &&
              new Date(end_date_timestamp) >= new Date(ex.date)
            );
          } else if (end_date_timestamp) {
            return new Date(end_date_timestamp) >= new Date(ex.date);
          } else if (start_date_timestamp) {
            return new Date(start_date_timestamp) <= new Date(ex.date);
          } else {
            return ex;
          }
        });

        return formatedExercisesDate.slice(0, _limit);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });

    res.json({ log: exercices, count: exercices.length });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
