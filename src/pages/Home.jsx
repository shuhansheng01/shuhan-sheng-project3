import React from "react";
import { Link } from "react-router-dom";
import "./Form.css"; // 复用之前的漂亮样式

export default function Home() {
  return (
    <div className="form-container" style={{textAlign: 'center', maxWidth: 
'600px'}}>
      <h1 style={{fontSize: '3rem', color: '#3b82f6', marginBottom: 
'10px'}}>Sudoku+</h1>
      <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: 
'40px'}}>
        The best place to play, learn, and master Sudoku.
      </p>

      <div style={{display: 'flex', gap: '20px', justifyContent: 
'center'}}>
        <Link to="/games">
          <button className="btn-primary" style={{padding: '15px 40px', 
fontSize: '1.1rem'}}>
            🎮 Start Playing
          </button>
        </Link>
        <Link to="/rules">
          <button className="btn-primary" style={{backgroundColor: '#fff', 
color: '#3b82f6', border: '1px solid #3b82f6'}}>
            📖 Read Rules
          </button>
        </Link>
      </div>

      <div style={{marginTop: '60px', borderTop: '1px solid #e2e8f0', 
paddingTop: '20px', color: '#94a3b8'}}>
        <p>Built for Project 3 · Full Stack MERN App</p>
      </div>
    </div>
  );
}
