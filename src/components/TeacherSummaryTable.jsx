import React from 'react';

const TeacherSummaryTable = ({ data, onSelect }) => {
  return (
    <div className="overflow-x-auto mt-6 rounded-xl border border-secondary shadow-sm bg-white">
      <table className="w-full text-right table-auto border-collapse">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-3">שם</th>
            <th className="px-4 py-3">היקף משרה</th>
            <th className="px-4 py-3">הוראה</th>
            <th className="px-4 py-3">ריכוז</th>
            <th className="px-4 py-3">סיוע</th>
            <th className="px-4 py-3">מספר תלמידות</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {data.map(teacher => (
            <tr
              key={teacher.id}
              onClick={() => onSelect(teacher.id)}
              className="hover:bg-secondary/60 cursor-pointer transition duration-150 border-b border-tableBorder"
            >
              <td className="px-4 py-2">{teacher.full_name}</td>
              <td className="px-4 py-2">{teacher.teaching_hours}</td>
              <td className="px-4 py-2">{teacher.teaching_hours}</td>
              <td className="px-4 py-2">{teacher.ricuz}</td>
              <td className="px-4 py-2">{teacher.siyua}</td>
              <td className="px-4 py-2">{teacher.total_students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherSummaryTable;
