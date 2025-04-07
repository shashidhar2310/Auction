const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find().populate("highestBidder", "username email");
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// Add a new player
router.post("/", async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json({ message: "Player added successfully", player: newPlayer });
  } catch (error) {
    res.status(500).json({ error: "Error adding player", details: error.message });
  }
});

module.exports = router;
