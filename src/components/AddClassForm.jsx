import React, { useState } from 'react';
import API from '../services/api';

const AddClassForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !teacherName) {
      alert('יש למלא שם כיתה ושם מחנכת');
      return;
    }

    const gradeName = name.trim().charAt(0); // המחזור מתוך שם הכיתה

    try {
      const res = await API.post('/classes', {
        name,
        gradeName,
        teacherName
      });

      onAdd(res.data); // מעדכן את רשימת הכיתות
      setName('');
      setTeacherName('');
    } catch (err) {
      console.error('שגיאה בהוספת כיתה', err);
      alert('שגיאה בהוספה');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>הוספת כיתה</h3>
      <input
        type="text"
        placeholder="לדוגמה: ב2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        type="text"
        placeholder="שם מחנכת"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button type="submit">הוספה</button>
    </form>
  );
};

export default AddClassForm;
