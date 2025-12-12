import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'; 

// Load environment variables for local testing
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;

// Hardcoded fallback for local testing if MONGO_URI is not set in .env
const part1 = "mongodb+srv://shuhansheng:VA1MMzVwHzQVPIgU";
const part2 = "@cluster0.4kjvzxu.mongodb.net/sudoku";
const part3 = "?retryWrites=true&w=majority&appName=Cluster0";
const fallbackURI = part1 + part2 + part3;

const connectionURI = mongoURI || fallbackURI;

console.log("Connecting to MongoDB...");

mongoose.connect(connectionURI)
  .then(() => console.log("DB Connected: Success"))
  .catch((err) => console.error("DB Error: Failed to connect", err));


// --- Database Schemas ---

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const GameSchema = new mongoose.Schema({
  name: { type: String, default: "Sudoku Game" }, 
  difficulty: String,
  board: [[Number]],
  solution: [[Number]],
  isCompleted: { type: Boolean, default: false }, 
  time: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now }
});
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

const ScoreSchema = new mongoose.Schema({
  username: String,
  time: Number,
  difficulty: String,
  date: { type: Date, default: Date.now }
});
const Score = mongoose.model('Score', ScoreSchema);

// --- Static Data and Helpers ---
const E_BD = 
[[1,2,0,0,5,6],[0,5,6,1,0,0],[2,0,1,0,6,0],[5,6,0,0,0,1],[0,0,2,6,4,0],[6,0,0,3,0,2]];
const E_SOL = 
[[1,2,3,4,5,6],[4,5,6,1,2,3],[2,3,1,5,6,4],[5,6,4,2,3,1],[3,1,2,6,4,5],[6,4,5,3,1,2]];

const N_BD = 
[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];
const N_SOL = 
[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];

const WORDS = ["apple", "banana", "cherry", "date", "elderberry", "fig", 
"grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", 
"papaya", "quince", "raspberry", "strawberry", "tangerine", "watermelon", 
"apricot", "avocado", "blackberry", "blueberry", "cantaloupe", "coconut", 
"cranberry", "durian", "guava", "lime", "mulberry", "peach", "pear", 
"plum", "pomegranate", "starfruit", "cloud", "sun", "moon", "star", 
"rain", "snow", "wind", "storm", "fog", "mist", "lightning", "thunder", 
"sky", "ocean", "river", "lake", "mountain", "hill", "valley", "forest", 
"tree", "leaf", "flower", "grass", "stone", "rock", "sand", "dirt", 
"fire", "water", "air", "earth", "metal", "wood", "glass", "plastic", 
"paper", "cloth", "silk", "wool", "cotton", "gold", "silver", "bronze", 
"copper", "iron", "steel", "ruby", "sapphire", "emerald", "diamond", 
"pearl", "opal", "quartz", "jade", "amber", "book", "pen", "pencil", 
"paper", "desk", "chair", "table", "lamp", "computer", "keyboard", 
"mouse", "screen", "phone", "camera", "radio", "television", "watch", 
"clock", "shoe", "sock", "hat", "coat", "shirt", "dress", "pants", 
"skirt", "house", "apartment", "building", "road", "car", "bus", "train", 
"plane", "boat", "ship", "bicycle", "motorcycle", "bridge", "park", 
"store", "market", "school", "hospital", "bank", "library", "museum", 
"church", "temple", "factory", "office", "cafe", "restaurant", "hotel", 
"garden", "farm", "city", "town", "village", "country", "world", "space", 
"planet", "galaxy", "universe", "time", "day", "night", "morning", 
"afternoon", "evening", "week", "month", "year", "season", "summer", 
"autumn", "winter", "spring", "hot", "cold", "warm", "cool", "big", 
"small", "tall", "short", "long", "wide", "narrow", "heavy", "light", 
"new", "old", "fast", "slow", "good", "bad", "happy", "sad", "angry", 
"calm", "tired", "energetic", "funny", "serious", "pretty", "ugly", 
"clean", "dirty", "loud", "quiet", "rich", "poor", "safe", "dangerous", 
"easy", "hard", "dark", "bright", "true", "false", "friend", "enemy", 
"family", "stranger", "love", "hate", "joy", "grief", "peace", "war", 
"truth", "lie", "question", "answer", "problem", "solution", "idea", 
"thought", "dream", "reality", "art", "music", "sport", "game", "book", 
"movie", "song", "dance", "work", "rest", "sleep", "eat", "drink", "walk", 
"run", "jump", "fly", "swim", "talk", "listen", "see", "hear", "smell", 
"taste", "feel", "think", "know", "learn", "teach", "help", "give", 
"take", "buy", "sell", "open", "close", "start", "stop", "go", "come", 
"live", "die", "win", "lose", "change", "stay", "find", "lose", "make", 
"break", "build", "destroy", "fix", "wait", "hurry", "cry", "laugh", 
"smile", "frown", "kiss", "hug", "hit", "kick", "push", "pull", "cut", 
"write", "read", "sing", "play", "study", "travel", "explore", "discover", 
"invent", "create", "protect", "attack", "defend", "share", "hide", 
"show", "tell", "ask", "call", "send", "receive", "agree", "argue", 
"compare", "imagine", "remember", "forget", "want", "need", "like", 
"dislike", "love", "hate", "hope", "fear", "believe", "doubt", "trust", 
"suspect", "admit", "deny", "confirm", "refuse", "accept", "reject", 
"allow", "forbid", "force", "persuade", "promise", "threaten", "suggest", 
"warn", "advise", "complain", "apologize", "forgive", "thank", "welcome", 
"invite", "exclude", "include", "avoid", "face", "ignore", "notice", 
"pay", "spend", "save", "waste", "earn", "borrow", "lend", "owe", "own", 
"use", "return", "repair", "clean", "cook", "wash", "drive", "ride", 
"fly", "sail", "walk", "run", "sit", "stand", "lie", "wake", "sleep", 
"breathe", "cough", "sneeze", "sigh", "whisper", "shout", "clap", "wave", 
"point", "nod", "shake", "bend", "stretch", "lift", "drop", "hold", 
"release", "tie", "untie", "wrap", "unwrap", "fold", "unfold", "mix", 
"separate", "combine", "divide", "increase", "decrease", "expand", 
"contract", "melt", "freeze", "boil", "fry", "bake", "roast", "grill", 
"steam", "chop", "slice", "peel", "stir", "pour", "fill", "empty", 
"measure", "weigh", "count", "calculate", "estimate", "guess", "check", 
"test", "prove", "disprove", "demonstrate", "explain", "describe", 
"define", "name", "label", "identify", "recognize", "remember", "recall", 
"memorize", "understand", "comprehend", "grasp", "realize", "imagine", 
"visualize", "dream", "fantasize", "wish", "hope", "desire", "crave", 
"need", "require", "demand", "request", "plead", "beg", "pray", "thank", 
"praise", "admire", "respect", "honor", "worship", "adore", "cherish", 
"value", "appreciate", "enjoy", "like", "dislike", "love", "hate", 
"detest", "dislike", "scorn", "mock", "tease", "bully", "anger", "fury", 
"rage", "ire", "wrath", "madness", "insanity", "crazy", "nuts", "sane", 
"rational", "logical", "wise", "smart", "clever", "intelligent", "dumb", 
"stupid", "foolish", "idiotic", "simple", "complex", "easy", "difficult", 
"challenging", "fun", "boring", "exciting", "dull", "interesting", 
"tedious", "quick", "rapid", "swift", "speedy", "slow", "leisurely", 
"gradual", "sudden", "abrupt", "gentle", "rough", "smooth", "bumpy", 
"soft", "hard", "tender", "tough", "fragile", "durable", "strong", "weak", 
"mighty", "feeble", "giant", "tiny", "huge", "small", "massive", 
"miniature", "broad", "narrow", "wide", "thin", "thick", "flat", "round", 
"square", "triangle", "straight", "curved", "bent", "crooked", "level", 
"slanted", "steep", "shallow", "deep", "high", "low", "tall", "short", 
"full", "empty", "packed", "vacant", "crowded", "sparse", "dense", 
"light", "heavy", "weighty", "airy", "loud", "silent", "noisy", "quiet", 
"bright", "dim", "shiny", "dull", "colorful", "pale", "vibrant", "faint", 
"clean", "messy", "neat", "untidy", "organized", "chaotic", "tidy", 
"sloppy", "wet", "dry", "damp", "arid", "moist", "parched", "cool", 
"warm", "hot", "cold", "frozen", "boiling", "fresh", "stale", "new", 
"used", "old", "antique", "ancient", "modern", "future", "past", 
"present", "early", "late", "punctual", "tardy", "fast", "slow", "quick", 
"leisurely", "easy", "difficult", "simple", "complex", "plain", "fancy", 
"beautiful", "ugly", "handsome", "plain", "pretty", "hideous", "lovely", 
"awful", "nice", "mean", "kind", "cruel", "polite", "rude", "friendly", 
"hostile", "gentle", "harsh", "soft", "severe", "brave", "cowardly", 
"bold", "timid", "courageous", "fearful", "happy", "sad", "joyful", 
"gloomy", "cheerful", "miserable", "excited", "bored", "thrilled", "dull", 
"lively", "lifeless", "active", "lazy", "busy", "idle", "tired", "rested", 
"sleepy", "awake", "hungry", "full", "thirsty", "quenched", "sick", 
"healthy", "ill", "well", "sore", "painful", "comfortable", "uneasy", 
"strong", "weak", "fit", "frail", "safe", "perilous", "secure", "risky", 
"certain", "doubtful", "sure", "unsure", "ready", "unprepared", 
"prepared", "unready"];
const getRandomName = () => {
  const selectRandom = () => WORDS[Math.floor(Math.random() * 
WORDS.length)];
  return `${selectRandom()} ${selectRandom()} ${selectRandom()}`;
};


// --- API Routes ---

// 1. User Auth

app.post('/api/user/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Error");

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send("Taken");

    const newUser = new User({ username, password });
    await newUser.save();
    res.send("OK");
  } catch (e) { res.status(500).send("Error"); }
});

app.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).send("Bad login");

    res.cookie('username', username, { httpOnly: false });
    res.send("OK");
  } catch (e) { res.status(500).send("Error"); }
});

app.post('/api/user/logout', (req, res) => {
  res.clearCookie('username');
  res.send("Out");
});

app.get('/api/user/me', (req, res) => {
  const username = req.cookies.username;
  if (username) res.json({ username });
  else res.status(401).send("No auth");
});

// 2. Game CRUD

app.get('/api/sudoku', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (e) { res.json([]); }
});

app.post('/api/sudoku', async (req, res) => {
  const { difficulty } = req.body;
  let sBoard = difficulty === 'EASY' ? E_BD : N_BD;
  let sSol = difficulty === 'EASY' ? E_SOL : N_SOL;

  const newGame = new Game({
    name: getRandomName(), 
    difficulty: difficulty || 'NORMAL',
    board: JSON.parse(JSON.stringify(sBoard)),
    solution: JSON.parse(JSON.stringify(sSol))
  });

  try {
    const saved = await newGame.save();
    res.json(saved);
  } catch (e) { res.status(500).json({ error: "Error" }); }
});

app.get('/api/sudoku/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.json(game);
  } catch (e) { res.status(404).send("404"); }
});

app.put('/api/sudoku/:id', async (req, res) => {
  const { board, isCompleted, time } = req.body;
  
  try {
    const updateFields = {};
    if (board) updateFields.board = board;
    if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;
    if (time !== undefined) updateFields.time = time;

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id, 
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedGame) return res.status(404).send("Game not found");
    res.json(updatedGame);
  } catch (e) {
    res.status(500).send("Update failed");
  }
});

app.delete('/api/sudoku/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (e) { res.status(500).send("Error"); }
});

// Core Fix: Clear All History (using POST /clear_all for stability)
app.post('/api/sudoku/clear_all', async (req, res) => {
  try {
    const [gameResult, scoreResult] = await Promise.all([
      Game.deleteMany({}),
      Score.deleteMany({})
    ]);

    console.log(`>>> History Cleared: Games=${gameResult.deletedCount}, 
Scores=${scoreResult.deletedCount}`);
    
    res.status(200).send("Deleted All"); 
  } catch (e) { 
    console.error("!!! ERROR: Failed to execute clear_all:", e);
    res.status(500).send("Error deleting all data"); 
  }
});

// 3. Scoreboard

app.post('/api/score', async (req, res) => {
  const { time, difficulty, username: clientUsername } = req.body;
  const username = clientUsername || req.cookies.username || "Guest";

  if (!time || !difficulty) return res.status(400).send("Missing data");

  try {
    const newScore = new Score({ username, time, difficulty });
    await newScore.save();
    res.send("Score Saved");
  } catch (e) {
    res.status(500).send("Error saving score");
  }
});

app.get('/api/score', async (req, res) => {
  try {
    const scores = await Score.find().sort({ time: 1 }).limit(20);
    res.json(scores);
  } catch (e) {
    res.status(500).send("Error fetching scores");
  }
});


// --- Server Start ---
app.listen(8000, () => console.log("Running on 8000"));
