const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Team = require("../../models/Team");
const Eval = require("../../models/Eval");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const TotalPoints = require("../../models/TotalPoints");


router.get("/", auth, async (req, res) => {
  try {
    console.log(req.team.id);
    const name = await Team.findById(req.team.id);
    const eval = await Eval.find({ teamName: name.teamName });
    res.json(eval);
    console.log("Result of eval");
    console.log(eval);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



router.get("/leaderboard", auth, async (req, res) => {
  try {
    const result = await TotalPoints.find().lean();

    // Apply robust sorting to handle any potential string values in points
    const sortedResult = result.sort((a, b) => Number(b.points) - Number(a.points));

    // Assign ranks based on sorted order
    let rank = 1;
    let previousPoints = null;
    
    const leaderboard = sortedResult.map((team, index) => {
      if (team.points !== previousPoints) {
        rank = index + 1;
      }
      previousPoints = team.points;

      return {
        rank,
        teamName: team.teamName,
        points: team.points,
      };
    });

    console.log(leaderboard);
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
