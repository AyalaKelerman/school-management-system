import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ width: '200px', padding: '1rem', background: '#f0f0f0' }}>
      <h3>ניווט</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><NavLink to="/classes">כיתות</NavLink></li>
        <li><NavLink to="/teachers">מורות</NavLink></li>
        <li><NavLink to="/students">תלמידות</NavLink></li>
        <li><NavLink to="/assistance">סיוע</NavLink></li>
        <li><NavLink to="/treatments">טיפולים</NavLink></li>
        <li><NavLink to="/schedule">מערכת שעות</NavLink></li>
        <li><NavLink to="/summary">ריכוז נתונים</NavLink></li>
        <li><NavLink to="/manage-data">הזנת נתונים</NavLink></li>
      </ul>
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>
        התנתק
      </button>
    </div>
  );
};

export default Sidebar;
