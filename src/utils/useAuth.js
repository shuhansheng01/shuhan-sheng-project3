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
        // 登出请求也需要 withCredentials
        await axios.post('/api/user/logout', {}, { withCredentials: true 
}); 
        setUsername(null);
    };

    // 暴露 setUsername，供 Login.jsx 登录成功后更新全局状态
    return { username, loading, logout, setUsername };
}
