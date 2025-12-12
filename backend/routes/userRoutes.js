import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET /api/user/isLoggedIn
router.get("/isLoggedIn", (req, res) => {
  const username = req.cookies && req.cookies.username;
  if (!username) {
    return res.status(401).json({ error: "Not logged in" });
  }
  return res.json({ username });
});

// POST /api/user/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ error: "Invalid login" });
    }

    // 如果存的是哈希
    if (user.passwordHash) {
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        return res.status(401).json({ error: "Invalid login" });
      }
    } else if (user.password) {
      // 如果模板里用的是明文 password 字段（不推荐）
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid login" });
      }
    } else {
      return res.status(500).json({ error: "User has no password set" });
    }

    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.json({ username });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

// POST /api/user/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const existing = await User.findOne({ username }).exec();
    if (existing) {
      return res.status(409).json({ error: "User exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      passwordHash,
    });

    await user.save();

    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({ username });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Register failed" });
  }
});

// POST /api/logout
router.post("/logout", (req, res) => {
  res.clearCookie("username");
  return res.json({ ok: true });
});

export default router;

