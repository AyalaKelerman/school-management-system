import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // מעבר לדף הראשי
    } catch (err) {
      alert('שם משתמש או סיסמה לא נכונים');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
};

export default LoginPage;
