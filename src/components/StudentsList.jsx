import React, { useEffect, useState } from 'react';
import API from '../services/api';

const StudentsList = ({ classId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!classId) return;

    API.get(`/students/by-class/${classId}`)
      .then(res => setStudents(res.data))
      .catch(err => console.error('שגיאה בטעינת תלמידות:', err));
  }, [classId]);

  if (!classId) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>תלמידות בכיתה</h4>
      {students.length === 0 ? (
        <p>אין תלמידות רשומות</p>
      ) : (
        <ul>
          {students.map(s => (
            <li key={s.id}>{s.full_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentsList;
