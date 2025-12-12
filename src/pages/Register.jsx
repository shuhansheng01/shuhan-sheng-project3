import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚨 修复: 使用相对路径 /api/...
      const response = await axios.post('/api/user/register', {
        username,
        password,
      });

      if (response.data === 'OK') {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert('Registration failed due to an unknown error.');
      }
    } catch (err) {
      console.error('Registration error details:', err.response || err);
      
      let message = 'Register failed.';
      if (err.response && err.response.data === 'Taken') {
        message = 'Username is already taken.';
      } else if (err.response && err.response.status === 400) {
        message = 'Invalid username or password.';
      } else {
        message = 'Register failed. Check server connection.';
      }
      alert(message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </form>
    </div>
  );
}
