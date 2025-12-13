// src/utils/useAuth.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 检查用户是否已登录
        axios.get('/api/user/me')
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

    return { username, loading, logout };
}
