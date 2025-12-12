import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Scores.css"; 

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🚨 修复: 使用相对路径 /api/...
    axios.get("/api/score")
      .then(res => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching scores:", err);
        setError("Failed to load scores. Check server connection.");
        setLoading(false);
      });
  }, []);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, 
'0')}`;
  };

  if (loading) return <div className="scores-container">Loading 
scores...</div>;
  if (error) return <div className="scores-container" 
style={{color:'red'}}>{error}</div>;

  return (
    <div className="scores-container">
      <header>
        <h1>🏆 Global Leaderboard</h1>
        <button onClick={() => navigate('/games')} 
className="back-button">Back to Lobby</button>
      </header>
      
      {scores.length === 0 ? (
        <p style={{textAlign:'center', color:'#888', marginTop: 30}}>No 
scores submitted yet. Be the first to win!</p>
      ) : (
        <table className="scores-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Time</th>
              <th>Difficulty</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score._id}>
                <td>{index + 1}</td>
                <td><strong>{score.username}</strong></td>
                <td>{formatTime(score.time)}</td>
                <td><span className={`badge 
${score.difficulty}`}>{score.difficulty}</span></td>
                <td>{new Date(score.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
