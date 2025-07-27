import React, { useState } from 'react';
import API from '../../services/api';

const emptyRole = { name: '' };

const RolesForm = ({ refreshRoles }) => {
  const [roles, setRoles] = useState([emptyRole]);

  const handleChange = (index, value) => {
    const updated = [...roles];
    updated[index].name = value;
    setRoles(updated);
  };

  const addRow = () => setRoles([...roles, { name: '' }]);

  const removeRow = (index) => {
    if (roles.length > 1) {
      const updated = roles.filter((_, i) => i !== index);
      setRoles(updated);
    }
  };

  const handleSave = async () => {
    const cleaned = roles.filter(role => role.name && role.name.trim() !== '');
    if (cleaned.length === 0) {
      alert('אין תפקידים לשמירה');
      return;
    }

    try {
      await API.post('/roles/bulk', cleaned);
      alert('התפקידים נשמרו בהצלחה');
      setRoles([emptyRole]);
      if (refreshRoles) refreshRoles();
    } catch (err) {
      console.error(err);
      alert('שגיאה בשמירה');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* כותרת */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          הוספת תפקידים
        </h2>
        <p className="text-gray-600">הגדירי תפקידים שונים במערכת (מורה, סייעת, מטפלת וכו')</p>
      </div>

      {/* רשימת תפקידים */}
      <div className="space-y-4 mb-6">
        {roles.map((role, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">תפקיד #{i + 1}</span>
              {roles.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors duration-200"
                  title="מחק תפקיד"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}

              <label className="block text-sm font-medium text-gray-700">
                שם התפקיד
              </label>
              <input
                placeholder="למשל: מורה, סייעת, מטפלת, רכזת"
                required
                value={role.name}
                onChange={e => handleChange(i, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 placeholder-gray-400"
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
          הוסף תפקיד
        </button>
        
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
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

export default RolesForm;