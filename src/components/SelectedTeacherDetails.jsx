import React from 'react';
import TeacherScheduleTable from './TeacherScheduleTable';

const SelectedTeacherDetails = ({ teacher, schedule, students, onBack }) => {
  if (!teacher) return null;

  return (
    <div style={{ direction: 'rtl', padding: '1rem' }}>
      <button onClick={onBack}>חזרה לרשימת מורות</button>

      <h3>פרטים אישיים</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>שם</th>
            <th>היקף משרה</th>
            <th>הוראה</th>
            <th>ריכוז</th>
            <th>סיוע</th>
            <th>מספר תלמידות</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{teacher.full_name}</td>
            <td>{teacher.teaching_hours}</td>
            <td>{teacher.teaching_hours}</td>
            <td>{teacher.ricuz}</td>
            <td>{teacher.siyua}</td>
            <td>{teacher.total_students}</td>
          </tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: '2rem' }}>מערכת שעות</h4>
      <TeacherScheduleTable schedule={schedule} />

      <h4 style={{ marginTop: '2rem' }}>רשימת תלמידות</h4>
      <table border="1" cellPadding="5" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>תלמידה</th>
            <th>כיתה</th>
            <th>תחום לימודי</th>
            <th>אפיון</th>
            <th>הערות</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.full_name}</td>
              <td>{s.class_name}</td>
              <td>{s.subject}</td>
              <td>{s.difficulties}</td>
              <td>{s.notes || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedTeacherDetails;
