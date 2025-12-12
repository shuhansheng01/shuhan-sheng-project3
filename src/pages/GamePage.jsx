import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GamePage.css";

const getCurrentUser = async function () {
  try {
    const res = await axios.get("http://localhost:8000/api/user/me", { 
withCredentials: true });
    return res.data.username;
  } catch (e) {
    return "Guest";
  }
};


export default function GamePage() {
  const { gameId } = useParams(); 
  const navigate = useNavigate();

  const [board, setBoard] = useState([]);      
  const [fixed, setFixed] = useState([]);      
  const [solution, setSolution] = useState([]); 
  const [difficulty, setDifficulty] = useState("NORMAL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWin, setIsWin] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const updateGameProgress = function(newBoard, completed = false, 
finalTime = 0) {
    axios.put(`http://localhost:8000/api/sudoku/${gameId}`, {
      board: newBoard.map(row => row.map(c => (c === "" ? 0 : 
parseInt(c)))),
      isCompleted: completed,
      time: finalTime
    }).catch(e => console.error("Failed to save progress", e));
  };


  useEffect(() => {
    // 获取游戏数据
    axios.get(`http://localhost:8000/api/sudoku/${gameId}`)
      .then(res => {
        const data = res.data;
        
        // 🚨 核心修复：检查数据有效性
        if (!data || !Array.isArray(data.solution) || 
!Array.isArray(data.board)) {
            setError("Game data is invalid or missing.");
            setLoading(false);
            return;
        }
        
        setSolution(data.solution);
        setDifficulty(data.difficulty);
        setIsWin(data.isCompleted); 
        
        if (data.isCompleted && data.time) {
            setSeconds(data.time);
        } else {
            setSeconds(0); 
        }
        
        // 如果游戏已完成，显示答案
        const initialBoard = data.isCompleted ? 
          data.solution.map(row => row.map(String)) : 
          data.board.map(row => row.map(c => (c === 0 ? "" : String(c))));

        setBoard(initialBoard);
        
        setFixed(data.board.map(row => 
          row.map(c => c !== 0)
        ));
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Load failed. Could not fetch game data.");
        setLoading(false);
      });
  }, [gameId]);

  // 计时器
  useEffect(() => {
    if (loading || isWin) return;
    const timerId = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timerId);
  }, [loading, isWin]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, 
'0')}`;
  };

  const saveFinalScore = async (finalTime, diff) => {
      try {
        const currentUsername = await getCurrentUser();
        
        await axios.post("http://localhost:8000/api/score", {
          time: finalTime,
          difficulty: diff,
          username: currentUsername
        }, { withCredentials: true });
        
      } catch (e) {
        console.error("Failed to save score to leaderboard:", e);
      }
  };

  const checkWin = function(currentBoard) {
    const isFull = currentBoard.every(row => row.every(cell => cell !== 
""));
    if (!isFull) return false;

    let won = true;
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[0].length; j++) {
        if (parseInt(currentBoard[i][j]) !== solution[i][j]) {
          won = false;
          break;
        }
      }
    }
    
    if (won) {
        setIsWin(true);
        saveFinalScore(seconds, difficulty);
        updateGameProgress(currentBoard, true, seconds);
        setTimeout(() => alert(`🎉 You Won in ${formatTime(seconds)}!`), 
100);
        setTimeout(() => navigate("/scores"), 1500);
    }
    return won;
  };

  const handleChange = (r, c, val) => {
    if (fixed[r][c] || isWin) return;
    if (val === "" || /^[1-9]$/.test(val)) {
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[r][c] = val;
      setBoard(newBoard);
      
      const won = checkWin(newBoard); 
      if (!won) {
          updateGameProgress(newBoard, false, seconds);
      }
    }
  };


  const handleReset = () => {
    if (!window.confirm("Restart?")) return;
    const resetBoard = board.map((row, r) => 
      row.map((cell, c) => (fixed[r][c] ? cell : ""))
    );
    setBoard(resetBoard);
    setSeconds(0);
    setIsWin(false);
    updateGameProgress(resetBoard, false, 0); // 重置时清空数据库进度
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/sudoku/${gameId}`);
      navigate("/games");
    } catch (e) { alert("Delete failed"); }
  };

  if (loading) return <div>Loading...</div>;
  
  // 渲染错误信息
  if (error) return <div style={{color:'red', padding:20, 
textAlign:'center'}}>
      <h2>Game Load Error</h2>
      <p>{error}</p>
      <button onClick={() => navigate('/games')}>Back to Lobby</button>
  </div>;

  const gridSize = board.length;
  const boxHeight = gridSize === 6 ? 2 : 3;
  const boxWidth = 3; 

  return (
    <div className="game-wrapper">
      <h1>Sudoku</h1>
      
      {isWin && <p className="win-message" style={{color:'green', 
fontWeight:'bold'}}>✅ COMPLETED!</p>}
      
      <div className="timer-display">Time: 
<span>{formatTime(seconds)}</span></div>

      <div className="sudoku-board">
        {board.map((row, r) => (
          <div key={r} className="board-row">
            {row.map((cell, c) => {
              const isFixed = fixed[r][c];
              const isError = !isFixed && cell !== "" && !isWin && 
parseInt(cell) !== solution[r][c];
              
              const borderRight = (c + 1) % boxWidth === 0 && c !== 
gridSize - 1;
              const borderBottom = (r + 1) % boxHeight === 0 && r !== 
gridSize - 1;
              
              let classes = `cell ${isFixed ? "fixed" : ""} ${isError ? 
"error" : ""}`;
              if (borderRight) classes += " thick-right";
              if (borderBottom) classes += " thick-bottom";

              return (
                <input
                  key={`${r}-${c}`}
                  type="text"
                  maxLength={1}
                  className={classes}
                  value={cell}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  disabled={isFixed || isWin}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="game-controls">
        <button onClick={() => navigate('/games')}>Back</button>
        {!isWin && <button onClick={handleReset} 
className="btn-reset">Reset</button>}
        <button onClick={handleDelete} 
className="btn-delete">Delete</button>
      </div>
    </div>
  );
}
