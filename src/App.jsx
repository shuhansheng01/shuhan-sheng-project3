import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 

// 引入所有页面
import Home from './pages/Home';       // ✅ 新增
import Rules from './pages/Rules';     // ✅ 新增
import Scores from './pages/Scores';   // ✅ 新增
import Games from './pages/Games';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      
      <Routes>
        {/* ✅ 现在首页指向 Home 组件，而不是直接跳转 */}
        <Route path="/" element={<Home />} />
        
        <Route path="/games" element={<Games />} />
        <Route path="/rules" element={<Rules />} />     {/* ✅ 连接 Rules 
*/}
        <Route path="/scores" element={<Scores />} />   {/* ✅ 连接 Scores 
*/}
        
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
