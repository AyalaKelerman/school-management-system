import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AddScheduleToExistingStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get('/students').then(res => setStudents(res.data));
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schedule = {
      day,
      hour,
      student_id: selectedStudent,
      subject,
      teacher_id: teacherId
    };
    await API.post('/schedules', schedule);
    setDay('');
    setHour('');
    setSubject('');
    setTeacherId('');
    alert('שורה נוספת למערכת נוספה בהצלחה');
  };

  return (
    <div>
      <h3>הוספת שעות לתלמידה קיימת</h3>
      <form onSubmit={handleSubmit}>
        <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
          <option value="">בחרי תלמידה</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.full_name}</option>
          ))}
        </select>
        <select value={day} onChange={e => setDay(e.target.value)} required>
          <option value="">בחרי יום</option>
          {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input type="number" min="1" max="8" value={hour} onChange={e => setHour(e.target.value)} placeholder="שעה" required />
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="מקצוע" required />
        <select value={teacherId} onChange={e => setTeacherId(e.target.value)} required>
          <option value="">בחרי מורה</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.full_name}</option>
          ))}
        </select>
        <button type="submit">הוספה</button>
      </form>
    </div>
  );
};

export default AddScheduleToExistingStudent;
