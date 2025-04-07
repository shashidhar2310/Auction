const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Player = require("./models/Player");
const Bid = require("./models/Bid");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ Auth Routes ------------------ //

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});


app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find().populate("highestBidder", "username email");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

app.post("/api/Addplayers", async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json({ message: "Player added", player: newPlayer });
  } catch (err) {
    res.status(400).json({ error: "Failed to add player", details: err.message });
  }
});

app.get("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("highestBidder", "username email");
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    console.error("Error fetching player by ID:", err);
    res.status(500).json({ error: "Failed to fetch player" });
  }
});

// Place a bid
app.post("/api/bid", async (req, res) => {
  const { playerId, userId, bidAmount } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    if (bidAmount <= player.currentBid) {
      return res.status(400).json({ error: "Bid must be higher than current bid" });
    }

    // Save the bid
    const bid = new Bid({
      playerId,
      userId,
      bidAmount,
    });
    await bid.save();

    // Update player with new bid
    player.currentBid = bidAmount;
    player.highestBidder = userId;
    await player.save();

    res.status(200).json({ message: "Bid placed successfully", bid });
  } catch (err) {
    console.error("Error placing bid:", err);
    res.status(500).json({ error: "Failed to place bid" });
  }
});



// ------------------ Start Server ------------------ //

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
})
.catch((err) => console.error("MongoDB connection error:", err));
