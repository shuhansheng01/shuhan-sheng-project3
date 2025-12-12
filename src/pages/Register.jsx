import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords mismatch"); // 短字符串
      return;
    }
    if (!username || !password) {
      setError("Fill all fields"); // 短字符串
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/user/register", {
        username,
        password
      });
      alert("Success! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      // ✅ 关键修改：缩短字符串，防止换行报错
      setError("Register failed.");
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <div className="form-group">
        <label>Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
        />
      </div>
      <div className="form-group">
        <label>Verify Password</label>
        <input 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          type="password" 
        />
      </div>
      
      {error && <p className="error-msg" 
style={{color:'red'}}>{error}</p>}

      <button onClick={handleRegister} className="btn-primary">
        Create Account
      </button>
    </div>
  );
}
