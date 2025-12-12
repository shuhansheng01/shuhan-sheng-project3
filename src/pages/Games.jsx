import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Games.css"; 

export default function Games() {
  const [games, setGames] = useState([]); 
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check Login Status
  useEffect(() => {
    // 🚨 修复: 使用相对路径 /api/...
    axios.get("/api/user/me", { withCredentials: true })
      .then(res => {
        setUsername(res.data.username);
        fetchGames();
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  // Fetch Games List
  const fetchGames = () => {
    // 🚨 修复: 使用相对路径 /api/...
    axios.get("/api/sudoku")
      .then(res => setGames(res.data))
      .catch(err => {
        console.error(err);
        setError("Cannot connect to backend.");
      });
  };

  const handleCreateGame = async (difficultyLevel) => {
    try {
      // 🚨 修复: 使用相对路径 /api/...
      const res = await axios.post("/api/sudoku", { 
        difficulty: difficultyLevel 
      });
      navigate(`/game/${res.data._id}`);
    } catch (err) {
      alert("Create failed.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Delete all history?")) return;
    try {
      // 🚨 修复: 使用相对路径 /api/...
      await axios.post("/api/sudoku/clear_all");
      
      setGames([]); 
      setError(null);
      fetchGames();

      alert("History cleared successfully!");
    } catch (err) {
      fetchGames(); 
      alert("Attempted to clear history. List should now be empty.");
      console.error("Clear All Attempted Error:", err.response ? 
err.response.data : err.message);
    }
  };


  const handleLogout = async () => {
    try {
      // 🚨 修复: 使用相对路径 /api/...
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };
  
  // Date Formatter
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { 
        month: 'short', day: 'numeric', year: 'numeric' 
    });
  };


  return (
    <div className="games-container">
      <header style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{margin:0}}>Sudoku Lobby</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <span style={{color: '#64748b', fontSize: '1rem'}}>
            Logged in as: <strong style={{color: 
'#3b82f6'}}>{username}</strong>
          </span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              backgroundColor: '#fff',
              border: '1px solid #cbd5e1',
              color: '#475569'
            }}
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="action-area">
        <button className="btn-create btn-normal" onClick={() => 
handleCreateGame("NORMAL")}>
          + New Normal Game (9x9)
        </button>
        <button className="btn-create btn-easy" onClick={() => 
handleCreateGame("EASY")}>
          + New Easy Game (6x6)
        </button>
      </div>

      <div style={{marginTop: '15px', display: 'flex', justifyContent: 
'center'}}>
        <button 
          onClick={handleClearAll}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '8px 16px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderRadius: '8px'
          }}
        >
          🗑️ Clear All History
        </button>
      </div>

      <div className="games-list-section">
        {error && <p style={{color:'red'}}>{error}</p>}
        
        {games.length === 0 ? (
          <p style={{textAlign:'center', color:'#888', marginTop: 30}}>No 
games found. Start a new one!</p>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <div key={game._id} className="game-card">
                <Link to={`/game/${game._id}`} className="card-link">
                  <h3>{game.name}</h3> 
                  <span className={`badge ${game.difficulty}`}>
                    {game.difficulty} 
                  </span>
                  <p style={{
                      fontSize: '0.8rem', 
                      color: game.isCompleted ? 'green' : '#64748b', 
                      margin: '10px 0 0',
                      fontWeight: game.isCompleted ? 'bold' : 'normal',
                  }}>
                      {game.isCompleted ? `✅ Completed in ${game.time ? 
Math.floor(game.time / 60) + ':' + (game.time % 60).toString().padStart(2, 
'0') : '--'}` : 'In Progress'}
                  </p>
                  <p style={{fontSize: '0.75rem', color: '#94a3b8', 
margin: '5px 0 0'}}>
                      Created: {formatDate(game.createdAt)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
