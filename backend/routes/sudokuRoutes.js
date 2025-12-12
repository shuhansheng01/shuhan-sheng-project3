import express from "express";
import { SudokuGame } from "../models/SudokuGame.js";

const router = express.Router();

// Simple word list for game names
const WORDS = [
  "Sunny",
  "Leaf",
  "Moon",
  "Puzzle",
  "Magic",
  "Stone",
  "River",
  "Cloud",
  "Forest",
  "Ocean",
  "Star",
  "Garden",
];

function randomWord() {
  const i = Math.floor(Math.random() * WORDS.length);
  return WORDS[i];
}

async function generateUniqueName() {
  for (let i = 0; i < 10; i += 1) {
    const name = randomWord() + " " + randomWord() + " " + randomWord();
    const existing = await SudokuGame.findOne({ name }).exec();
    if (!existing) {
      return name;
    }
  }
  return null;
}

// GET /api/sudoku  -> list games
router.get("/", async (req, res) => {
  try {
    const games = await SudokuGame.find(
      {},
      "name difficulty createdBy createdAt"
    )
      .sort({ createdAt: -1 })
      .exec();

    return res.json(games);
  } catch (err) {
    console.error("GET /api/sudoku error:", err);
    return res.status(500).json({ error: "Failed to load games" });
  }
});

// POST /api/sudoku  -> create new game
router.post("/", async (req, res) => {
  try {
    const { difficulty } = req.body || {};
    const rawDiff = (difficulty || "NORMAL").toString().toUpperCase();
    const finalDiff = rawDiff === "EASY" ? "EASY" : "NORMAL";

    const createdBy =
      req.cookies && req.cookies.username ? req.cookies.username : 
"guest";

    const name = await generateUniqueName();
    if (!name) {
      return res.status(500).json({ error: "Could not make game name" });
    }

    const game = new SudokuGame({
      name,
      difficulty: finalDiff,
      createdBy,
    });

    await game.save();

    // 这里同时返回 id 和 _id，前端无论用哪一个都能正常工作
    return res.status(201).json({
      id: game._id.toString(),
      _id: game._id,
      name: game.name,
      difficulty: game.difficulty,
      createdBy: game.createdBy,
      createdAt: game.createdAt,
    });
  } catch (err) {
    console.error("POST /api/sudoku error:", err);
    return res.status(500).json({ error: "Failed to create game" });
  }
});

// GET /api/sudoku/:id  -> game meta
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await SudokuGame.findById(id).exec();
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json({
      id: game._id,
      name: game.name,
      difficulty: game.difficulty,
      createdBy: game.createdBy,
      createdAt: game.createdAt,
    });
  } catch (err) {
    console.error("GET /api/sudoku/:id error:", err);
    return res.status(500).json({ error: "Failed to load game" });
  }
});

// DELETE /api/sudoku/:id  -> delete game (bonus)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await SudokuGame.findByIdAndDelete(id).exec();
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/sudoku/:id error:", err);
    return res.status(500).json({ error: "Failed to delete game" });
  }
});

// PUT /api/sudoku/:id  -> update game (for REST requirement)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};

    const game = await SudokuGame.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json({
      id: game._id,
      name: game.name,
      difficulty: game.difficulty,
      createdBy: game.createdBy,
      createdAt: game.createdAt,
    });
  } catch (err) {
    console.error("PUT /api/sudoku/:id error:", err);
    return res.status(500).json({ error: "Failed to update game" });
  }
});

export default router;

