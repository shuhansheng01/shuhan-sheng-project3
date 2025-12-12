import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css"; 

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/score")
      .then(res => {
        setScores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return min + ":" + sec.toString().padStart(2, '0');
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();

  return (
    <div className="form-container">
      <h1>Leaderboard</h1>
      
      {loading && <p>Loading...</p>}
      
      {!loading && scores.length === 0 && (
        <p>No scores yet.</p>
      )}

      {!loading && scores.length > 0 && (
        <table style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: '#666' }}>
              <th>Rank</th>
              <th>Player</th>
              <th>Time</th>
              <th>Mode</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td><strong>{s.username}</strong></td>
                <td style={{ color: 'green' }}>{formatTime(s.time)}</td>
                <td>{s.difficulty}</td>
                <td style={{ fontSize: '0.8rem' 
}}>{formatDate(s.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
