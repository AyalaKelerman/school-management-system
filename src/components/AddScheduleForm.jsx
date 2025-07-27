import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AddScheduleForm = ({ studentId, onScheduleAdded }) => {
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [student, setStudent] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // שליפת התלמידה לפי ID
  useEffect(() => {
    if (!studentId) return;

    API.get(`/students/${studentId}`).then(res => {
      setStudent(res.data);

      // נניח שקשיים זה מערך של מחרוזות
      if (res.data.difficulties && Array.isArray(res.data.difficulties)) {
        setAvailableSubjects(res.data.difficulties);
      } else if (typeof res.data.difficulties === 'string') {
        try {
          const parsed = JSON.parse(res.data.difficulties);
          if (Array.isArray(parsed)) {
            setAvailableSubjects(parsed);
          } else {
            setAvailableSubjects(res.data.difficulties.split(',').map(s => s.trim()));
          }
        } catch (e) {
          setAvailableSubjects(res.data.difficulties.split(',').map(s => s.trim()));
        }
      }
    });
  }, [studentId]);

  // שליפת כל המורות
  useEffect(() => {
    API.get('/teachers').then(res => {
      setTeachers(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schedule = {
      day,
      hour,
      student_id: studentId,
      subject,
      teacher_id: teacherId,
    };

    await API.post('/schedules', schedule);
    setDay('');
    setHour('');
    setSubject('');
    setTeacherId('');
    if (onScheduleAdded) onScheduleAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>שורת מערכת חדשה</h4>

      <select value={day} onChange={e => setDay(e.target.value)} required>
        <option value="">בחרי יום</option>
        {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'].map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="8"
        value={hour}
        onChange={e => setHour(e.target.value)}
        placeholder="שעה"
        required
      />

      {/* מקצוע מתוך רשימת הקשיים */}
      <select value={subject} onChange={e => setSubject(e.target.value)} required>
        <option value="">בחרי מקצוע (מתוך הקשיים)</option>
        {availableSubjects.map((subj, index) => (
          <option key={index} value={subj}>{subj}</option>
        ))}
      </select>

      {/* רשימת מורות */}
      <select value={teacherId} onChange={e => setTeacherId(e.target.value)} required>
        <option value="">בחרי מורה</option>
        {teachers.map(t => (
          <option key={t.id} value={t.id}>{t.full_name}</option>
        ))}
      </select>

      <button type="submit">הוספה</button>
    </form>
  );
};

export default AddScheduleForm;
