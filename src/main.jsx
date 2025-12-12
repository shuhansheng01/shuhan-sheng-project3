import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // 如果你没有index.css，这行可以删掉

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ 路由器必须加在这里，且只能有一个！ */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
