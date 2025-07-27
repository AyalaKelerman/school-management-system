import React from 'react';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
const hours = [1, 2, 3, 4, 5, 6, 7];

const TeacherScheduleTable = ({ schedule }) => {
  const getCell = (day, hour) => {
    const row = schedule.find(item => item.day === day && Number(item.hour) === hour);
    if (!row) return '';
    return `${row.subject} ${row.student_name ? `(${row.student_name})` : ''}`;
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-secondary shadow-sm bg-white">
      <table className="w-full text-sm text-right border-collapse">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 border border-tableBorder">שעה / יום</th>
            {days.map(day => (
              <th key={day} className="px-4 py-2 border border-tableBorder">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {hours.map(hour => (
            <tr key={hour} className="border-t hover:bg-secondary/50 transition duration-150">
              <td className="px-4 py-2 font-semibold border border-tableBorder">{hour}</td>
              {days.map(day => (
                <td key={day} className="px-4 py-2 border border-tableBorder">
                  {getCell(day, hour)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherScheduleTable;
