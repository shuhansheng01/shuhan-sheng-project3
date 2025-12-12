import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./NavBar.css"; // 我们稍后创建这个样式

export default function NavBar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 监听路径变化

  // 每次页面跳转（比如从登录页跳到游戏页），都重新检查一下登录状态
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/me", { withCredentials: true 
})
      .then(res => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername(null); // 没登录或 Cookie 过期
      });
  }, [location]); 

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/logout", {}, { 
withCredentials: true });
      setUsername(null);
      navigate("/login");
    } catch (e) {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Sudoku+</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/scores">Scores</Link>
      </div>

      <div className="navbar-auth">
        {username ? (
          /* ✅ 登录后显示：用户名 + Logout */
          <div className="user-info">
            <span className="welcome-text">Hi, 
<strong>{username}</strong></span>
            <button onClick={handleLogout} 
className="btn-logout">Logout</button>
          </div>
        ) : (
          /* ❌ 没登录显示：Login + Register */
          <div className="guest-info">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link 
highlight">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
