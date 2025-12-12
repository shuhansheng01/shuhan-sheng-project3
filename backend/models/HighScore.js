import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SudokuGame",
    required: true,
  },
  timeInSeconds: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
