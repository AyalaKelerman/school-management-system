import React from 'react';

const TeachersTable = ({ teachers }) => {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
      <thead style={{ backgroundColor: '#3f51b5', color: 'white' }}>
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
        {teachers.map((teacher, idx) => (
          <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f2f2f2' : '#d9dce1' }}>
            <td>{teacher.full_name}</td>
            <td>{teacher.teaching_hours || 0}</td>
            <td>{teacher.hours_teaching || 0}</td>
            <td>{teacher.hours_supervision || 0}</td>
            <td>{teacher.hours_support || 0}</td>
            <td>{teacher.student_count || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeachersTable;
