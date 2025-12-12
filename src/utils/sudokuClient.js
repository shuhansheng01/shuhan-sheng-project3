// 一些简单的预设棋盘（不是很难，但足够作业用）
// 0 表示空格，需要玩家填写

const EASY_PUZZLES = [
  {
    initial: [
      [1, 0, 3, 4, 0, 6],
      [0, 5, 0, 1, 2, 0],
      [2, 0, 4, 0, 6, 1],
      [0, 6, 1, 2, 0, 4],
      [3, 4, 0, 6, 1, 0],
      [6, 0, 2, 0, 4, 5],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 4, 5, 6, 1],
      [5, 6, 1, 2, 3, 4],
      [3, 4, 5, 6, 1, 2],
      [6, 1, 2, 3, 4, 5],
    ],
  },
];

const NORMAL_PUZZLES = [
  {
    initial: [
      [0, 2, 0, 4, 5, 0, 7, 0, 9],
      [4, 0, 6, 0, 0, 9, 1, 2, 0],
      [7, 8, 0, 1, 0, 3, 0, 5, 6],
      [2, 0, 4, 5, 6, 0, 8, 9, 0],
      [0, 6, 7, 0, 9, 0, 2, 3, 0],
      [0, 9, 1, 0, 3, 4, 5, 0, 7],
      [3, 4, 0, 6, 0, 8, 0, 1, 2],
      [0, 7, 8, 9, 0, 0, 3, 0, 5],
      [9, 0, 2, 0, 4, 5, 0, 7, 0],
    ],
    solution: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ],
  },
];

// 根据难度拿一个预设棋盘（现在只有一个，可以扩展成多题随机）
export function getRandomPuzzle(difficulty) {
  if (difficulty === "EASY") {
    return EASY_PUZZLES[0];
  }
  return NORMAL_PUZZLES[0];
}

// 检查当前盘面是否完全等于解（没有 0 且全部匹配）
export function isBoardComplete(board, solution) {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0 || board[r][c] !== solution[r][c]) {
        return false;
      }
    }
  }
  return true;
}

// 把一个 board 深拷贝一份
export function cloneBoard(board) {
  return board.map((row) => [...row]);
}

