import React, { useState } from 'react';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
const hours = [1, 2, 3, 4, 5, 6, 7];

const ScheduleAvailability = ({ studentSchedule, teacherSchedule, studentId, teacherId, setStudentSchedule, setTeacherSchedule }) => {
  const [subject, setSubject] = useState('');

  const isBusy = (schedule, day, hour) => {
    return schedule.some(entry => entry.day === day && entry.hour === hour);
  };

  const handleCellClick = async (day, hour) => {
    if (!subject.trim()) {
      alert('נא להזין נושא שיעור לפני השיבוץ');
      return;
    }

    const confirm = window.confirm(`לשבץ שיעור "${subject}" ביום ${day} בשעה ${hour}?`);
    if (!confirm) return;

    try {
      const res = await fetch('http://localhost:5000/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          hour,
          student_id: studentId,
          teacher_id: teacherId,
          subject
        })
      });

      if (res.ok) {
        alert('השיעור שובץ בהצלחה!');
        setSubject('');

        const studentRes = await fetch(`http://localhost:5000/schedules?student_id=${studentId}`);
        const teacherRes = await fetch(`http://localhost:5000/schedules/by-teacher/${teacherId}`);
        const studentData = await studentRes.json();
        const teacherData = await teacherRes.json();

        setStudentSchedule(studentData);
        setTeacherSchedule(teacherData);
      } else {
        alert('אירעה שגיאה בשיבוץ');
      }
    } catch (err) {
      console.error(err);
      alert('שגיאת רשת');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>נושא השיעור: </label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="למשל: קריאה, חשבון..."
          style={{ padding: '0.5rem', width: '200px' }}
        />
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>\</th>
            {hours.map(hour => <th key={hour}>שעה {hour}</th>)}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td><strong>{day}</strong></td>
              {hours.map(hour => {
                const studentBusy = isBusy(studentSchedule, day, hour);
                const teacherBusy = isBusy(teacherSchedule, day, hour);
                const isAvailable = !studentBusy && !teacherBusy;

                return (
                  <td
                    key={hour}
                    onClick={() => isAvailable && handleCellClick(day, hour)}
                    style={{
                      backgroundColor: studentBusy ? '#fbb' : teacherBusy ? '#bbf' : '#cfc',
                      cursor: isAvailable ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {studentBusy && 'תלמידה תפוסה'}
                    {teacherBusy && 'מורה תפוסה'}
                    {isAvailable && 'פנוי'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleAvailability;
