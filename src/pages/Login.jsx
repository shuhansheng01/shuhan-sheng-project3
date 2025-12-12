import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Form.css"; // 🚨 确保导入 Form.css

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 使用相对路径 /api/...
      const response = await axios.post('/api/user/login', {
        username,
        password,
      }, { withCredentials: true });

      if (response.data === 'OK') {
        navigate('/games');
      } else {
        alert('Login failed: Unknown response.');
      }

    } catch (err) {
      console.error('Login error details:', err.response || err);
      let message = 'Login failed.';
      if (err.response && err.response.data === 'Bad login') {
        message = 'Invalid username or password.';
      } else {
        message = 'Login failed. Check server connection.';
      }
      alert(message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </form>
    </div>
  );
}
