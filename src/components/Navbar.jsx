import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth'; // 🚨 导入新的 Hook

// 简单的 Navbar CSS，确保它能居中对齐
const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 40px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box'
};

const navLinkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
};

export default function Navbar() {
    const { username, loading, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    // 如果正在加载，不显示任何认证链接
    if (loading) {
        return (
            <nav style={navStyle}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: 
'1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                    Sudoku+
                </Link>
                <div>
                    <Link to="/games" style={navLinkStyle}>Games</Link>
                    <Link to="/rules" style={navLinkStyle}>Rules</Link>
                    <Link to="/scores" style={navLinkStyle}>Scores</Link>
                </div>
                <div>Loading...</div>
            </nav>
        );
    }

    return (
        <nav style={navStyle}>
            <Link to="/" style={{ textDecoration: 'none', fontSize: 
'1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                Sudoku+
            </Link>
            
            {/* 中间导航链接 */}
            <div>
                <Link to="/games" style={navLinkStyle}>Games</Link>
                <Link to="/rules" style={navLinkStyle}>Rules</Link>
                <Link to="/scores" style={navLinkStyle}>Scores</Link>
            </div>

            {/* 认证和用户状态 */}
            <div>
                {username ? (
                    <>
                        <span style={{ ...navLinkStyle, color: '#4CAF50', 
fontWeight: 'bold' }}>
                            Hello, {username}
                        </span>
                        <button 
                            onClick={handleLogout} 
                            style={{ padding: '5px 10px', border: 'none', 
borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f44336', color: 
'white' }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" 
style={navLinkStyle}>Login</Link>
                        <Link to="/register" style={{ ...navLinkStyle, 
color: '#007bff' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
