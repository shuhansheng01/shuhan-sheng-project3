const words = [
  "Coconut",
  "Red",
  "House",
  "Ocean",
  "Bright",
  "Forest",
  "Panda",
  "River",
  "Cloud",
  "Moon",
  "Sunny",
  "Leaf",
  "Puzzle",
  "Magic",
  "Stone",
];

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function generateGameName() {
  return `${randomWord()} ${randomWord()} ${randomWord()}`;
}

