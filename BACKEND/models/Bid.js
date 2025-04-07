const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bidAmount: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", BidSchema);
