import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // ⚠️ 直连后端，并且开启 withCredentials 以保存 Cookie
      await axios.post("http://localhost:8000/api/user/login", {
        username,
        password
      }, { withCredentials: true });
      
      navigate("/games");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
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
      
      {error && <p className="error-msg" 
style={{color:'red'}}>{error}</p>}

      <button onClick={handleLogin} className="btn-primary">
        Login
      </button>
    </div>
  );
}
