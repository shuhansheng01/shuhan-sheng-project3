import mongoose from "mongoose";

const sudokuGameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["EASY", "NORMAL"],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SudokuGame = mongoose.model("SudokuGame", sudokuGameSchema);

