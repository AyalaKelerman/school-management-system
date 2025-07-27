import React, { useEffect, useState } from 'react';
import API from '../services/api';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
const hours = [1, 2, 3, 4, 5, 6, 7];

const ClassSchedule = ({ classId }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (!classId) return;
    API.get(`/schedules/by-class/${classId}`)
      .then(res => setSchedule(res.data))
      .catch(err => console.error('שגיאה בטעינת מערכת:', err));
  }, [classId]);

  const getCellData = (day, hour) => {
    return schedule.filter(row => row.day === day && row.hour === hour);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>מערכת שעות - תלמידות יוצאות</h4>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>שעה \ יום</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map(day => {
                const cellData = getCellData(day, hour);
                return (
                  <td key={day}>
                    {cellData.length > 0 ? (
                      cellData.map((row, i) => (
                        <div key={i}>
                          {row.student_name} ({row.subject})
                        </div>
                      ))
                    ) : (
                      <span style={{ color: '#ccc' }}>—</span>
                    )}
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

export default ClassSchedule;
