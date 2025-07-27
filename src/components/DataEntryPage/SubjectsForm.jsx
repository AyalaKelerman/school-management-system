import React, { useState } from 'react';
import API from '../../services/api';

const SubjectsForm = ({ refreshSubjects }) => {
  const [subjects, setSubjects] = useState([{ name: '' }]);

  const handleChange = (index, value) => {
    const updated = [...subjects];
    updated[index].name = value;
    setSubjects(updated);
  };

  const addRow = () => {
    setSubjects([...subjects, { name: '' }]);
  };

  const removeRow = (index) => {
    if (subjects.length > 1) {
      const updated = subjects.filter((_, i) => i !== index);
      setSubjects(updated);
    }
  };

  const handleSave = async () => {
    const cleaned = subjects.filter(subject => subject.name.trim() !== '');
    if (cleaned.length === 0) {
      alert('אין מקצועות לשמירה');
      return;
    }

    try {
      await API.post('/subjects/bulk', cleaned);
      alert('המקצועות נשמרו בהצלחה');
      setSubjects([{ name: '' }]);
      if (refreshSubjects) refreshSubjects();
    } catch (err) {
      console.error('שגיאה בשמירה:', err);
      alert('שגיאה בשמירה');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* כותרת */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6 mb-6 border border-emerald-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          הוספת מקצועות
        </h2>
        <p className="text-gray-600">הגדירי מקצועות לימוד וטיפול במערכת (מתמטיקה, עברית, אנגלית וכו')</p>
      </div>

      {/* רשימת מקצועות */}
      <div className="space-y-4 mb-6">
        {subjects.map((subject, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">מקצוע #{i + 1}</span>
              {subjects.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors duration-200"
                  title="מחק מקצוע"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}

              <label className="block text-sm font-medium text-gray-700">
                שם המקצוע
              </label>
              <input
                placeholder="למשל: מתמטיקה, עברית, אנגלית, חשבון"
                value={subject.name}
                onChange={e => handleChange(i, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
              />
            </div>
          </div>
        ))}
      </div>

      {/* כפתורי פעולה */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={addRow}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          הוסף מקצוע
        </button>
        
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          שמור הכל
        </button>
      </div>
    </div>
  );
};

export default SubjectsForm;