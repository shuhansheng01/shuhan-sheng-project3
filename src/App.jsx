import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar'; 

// Import Pages
import Home from './pages/Home';
import Rules from './pages/Rules';
import Scores from './pages/Scores';
import Games from './pages/Games';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/games" element={<Games />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/scores" element={<Scores />} />
        
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
