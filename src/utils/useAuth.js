import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 检查用户是否已登录，使用 /api/user/me
        // 需要 withCredentials: true 来发送 Cookie
        axios.get('/api/user/me')
            .then(res => {
                setUsername(res.data.username);
            })
            .catch(() => {
                // 如果 API 返回错误（如 401 No auth），则用户未登录
                setUsername(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const logout = async () => {
        // 调用后端登出 API
        await axios.post('/api/user/logout');
        setUsername(null);
    };

    return { username, loading, logout, setUsername };
}
