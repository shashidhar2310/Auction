const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  matches: Number,
  runs: Number,
  wickets: Number,
  strikeRate: Number,
  economy: Number,
  role: {
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"]
  },
  bidStartingTime: Date,
  bidEndingTime: Date,
  currentBid: Number,
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Player", PlayerSchema);

