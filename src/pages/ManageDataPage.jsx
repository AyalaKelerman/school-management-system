// src/pages/ManageDataPage.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Button } from "@/components/ui/button";

const ManageDataPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [newRows, setNewRows] = useState([
    { full_name: '', birth_date: '', position: '', teaching_hours: '', subjects: '' }
  ]);

  useEffect(() => {
    // נטען את המורות הקיימות אם נרצה בעתיד
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...newRows];
    updated[index][field] = value;
    setNewRows(updated);
  };

  const handleAddRow = () => {
    setNewRows([...newRows, { full_name: '', birth_date: '', position: '', teaching_hours: '', subjects: '' }]);
  };

  const handleSave = async () => {
    try {
      for (const teacher of newRows) {
        if (teacher.full_name) {
          await API.post('/teachers', teacher);
        }
      }
      alert('המורות נשמרו בהצלחה!');
      setNewRows([{ full_name: '', birth_date: '', position: '', teaching_hours: '', subjects: '' }]);
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      alert('אירעה שגיאה בשמירה');
    }
  };

  return (
    <div className="p-6 rtl space-y-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-header">הזנת מורות מרוכזת</h2>

      <table className="w-full table-auto border-collapse border border-tableBorder bg-white shadow">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-2">שם מלא</th>
            <th className="p-2">תאריך לידה</th>
            <th className="p-2">תפקיד</th>
            <th className="p-2">היקף משרה</th>
            <th className="p-2">תחומי הוראה</th>
          </tr>
        </thead>
        <tbody>
          {newRows.map((row, index) => (
            <tr key={index} className="border-t">
              {['full_name', 'birth_date', 'position', 'teaching_hours', 'subjects'].map(field => (
                <td key={field} className="p-2">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-right"
                    value={row[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4">
        <Button onClick={handleAddRow} className="bg-secondary hover:bg-secondaryDark">הוספת שורה</Button>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-primaryDark">שמור את כל המורות</Button>
      </div>
    </div>
  );
};

export default ManageDataPage;
