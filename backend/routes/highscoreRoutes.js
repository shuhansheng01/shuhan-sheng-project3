import express from "express";
import { Highscore } from "../models/Highscore.js";
import { SudokuGame } from "../models/SudokuGame.js";

const router = express.Router();

// GET /api/highscore
router.get("/", async (req, res) => {
  try {
    const scores = await Highscore.find({})
      .sort({ timeInSeconds: 1 })
      .exec();
    return res.json(scores);
  } catch (err) {
    console.error("GET /api/highscore error:", err);
    return res.status(500).json({ error: "Failed to load highscores" });
  }
});

// POST /api/highscore
router.post("/", async (req, res) => {
  try {
    const { gameId, timeInSeconds } = req.body || {};
    const username =
      req.cookies && req.cookies.username ? req.cookies.username : 
"guest";

    if (!gameId || typeof timeInSeconds !== "number") {
      return res.status(400).json({ error: "Missing data" });
    }

    const game = await SudokuGame.findById(gameId).exec();
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const existing = await Highscore.findOne({ gameId, username }).exec();

    if (existing) {
      if (timeInSeconds < existing.timeInSeconds) {
        existing.timeInSeconds = timeInSeconds;
        existing.finishedAt = new Date();
        await existing.save();
      }
      return res.json(existing);
    }

    const newScore = new Highscore({
      username,
      gameId,
      timeInSeconds,
      finishedAt: new Date(),
    });

    await newScore.save();
    return res.status(201).json(newScore);
  } catch (err) {
    console.error("POST /api/highscore error:", err);
    return res.status(500).json({ error: "Highscore save error" });
  }
});

// GET /api/highscore/:gameId
router.get("/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await SudokuGame.findById(gameId).exec();
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const scores = await Highscore.find({ gameId })
      .sort({ timeInSeconds: 1 })
      .exec();

    return res.json(scores);
  } catch (err) {
    console.error("GET /api/highscore/:gameId error:", err);
    return res
      .status(500)
      .json({ error: "Failed to load highscores for game" });
  }
});

export default router;

