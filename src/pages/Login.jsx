// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth'; 
import "./Form.css"; 

export default function Login() {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 从 useAuth 中获取 setUsername 来更新全局状态
  const { setUsername: setGlobalUsername } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/user/login', {
        username: localUsername,
        password,
      }, {
        // 🚨 关键: 确保接收到服务器设置的 Cookie
        withCredentials: true 
      });

      if (response.data === 'OK') {
        alert('Login successful! Redirecting...');
        setGlobalUsername(localUsername); // 🚨 成功后更新全局状态
        navigate('/'); 
      } else {
        alert('Login failed due to an unknown error.');
      }
    } catch (err) {
      console.error('Login error details:', err.response || err);
      
      let message = 'Login failed. Check server connection.';
      if (err.response && err.response.data === 'Bad login') {
        message = 'Invalid username or password.';
      } else if (err.response) {
        // 使用安全拼接避免构建错误
        const errorData = err.response.data || 'Unknown error';
        message = 'Login failed: ' + errorData; 
      }
      alert(message);
    }
    setLoading(false);
  };

  const isFormInvalid = !localUsername || !password;

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isFormInvalid || loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </form>
    </div>
  );
}
