import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Form.css"; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== verifyPassword) {
        alert("Registration failed: Passwords do not match.");
        setLoading(false);
        return;
    }

    try {
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
      } else {
        message = 'Register failed. Check server connection.';
      }
      alert(message);
    }
    setLoading(false);
  };

  // 确保当任何字段为空或密码不匹配时，按钮被禁用
  const isFormInvalid = !username || !password || !verifyPassword || 
password !== verifyPassword;

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
        <input
          type="password"
          placeholder="Verify Password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isFormInvalid || loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </form>
    </div>
  );
}
