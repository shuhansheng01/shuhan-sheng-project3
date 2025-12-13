import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Form.css"; // 🚨 导入 Form.css

export default function Home() {
  const navigate = useNavigate();

  return (
    // 🚨 修复：使用 scores-container 类名居中内容
    <div className="scores-container"> 
      <h1>Sudoku+</h1>
      <p>
        The best place to play, learn, and master Sudoku.
      </p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <button className="back-button" onClick={() => 
navigate('/games')}>
          <i className="fas fa-play"></i> Start Playing
        </button>
        <button 
          onClick={() => navigate('/rules')} 
          style={{ 
            padding: '10px 20px', 
            border: '1px solid #007bff', 
            backgroundColor: 'transparent',
            color: '#007bff',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-book-reader"></i> Read Rules
        </button>
      </div>
      <p style={{ marginTop: '50px', color: '#888' }}>
        Built for Project 3 · Full Stack MERN App
      </p>
    </div>
  );
}
