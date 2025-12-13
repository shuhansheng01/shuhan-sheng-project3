// src/utils/useAuth.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 检查用户是否已登录，需要 withCredentials: true 来发送 Cookie
        axios.get('/api/user/me', { withCredentials: true }) 
            .then(res => {
                setUsername(res.data.username);
            })
            .catch(() => {
                setUsername(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logout = async () => {
        await axios.post('/api/user/logout');
        setUsername(null);
    };

    // 🚨 暴露 setUsername，供 Login.jsx 登录成功后更新全局状态
    return { username, loading, logout, setUsername };
}
