// TeachersForm.jsx - גרסה מעוצבת בסגנון StudentsForm
import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import Select from 'react-select';

const createEmptyTeacher = () => ({
  full_name: '',
  birth_date: '',
  position_id: '',
  teaching_hours: '',
  subjects: [],
});

const TeachersForm = () => {
  const [teachers, setTeachers] = useState([createEmptyTeacher()]);
  const [positions, setPositions] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get('/roles').then(res => setPositions(res.data));
    API.get('/subjects').then(res => setSubjects(res.data));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...teachers];
    updated[index][field] = value;
    setTeachers(updated);
  };

  const handleSubjectsChange = (index, selectedOptions) => {
    const updated = [...teachers];
    updated[index].subjects = selectedOptions.map(opt => opt.value);
    setTeachers(updated);
  };

  const addRow = () => {
    setTeachers([...teachers, createEmptyTeacher()]);
  };

  const removeRow = (index) => {
    if (teachers.length > 1) {
      const updated = teachers.filter((_, i) => i !== index);
      setTeachers(updated);
    }
  };

  const handleSave = async () => {
    const cleaned = teachers.filter(t => t.full_name && t.birth_date && t.position_id && t.teaching_hours !== '');
    if (cleaned.length === 0) {
      alert('לא הוזנו מורות תקינות');
      return;
    }

    try {
      await API.post('/teachers/bulk', cleaned);
      alert('המורות נשמרו בהצלחה');
      setTeachers([createEmptyTeacher()]);
    } catch (err) {
      console.error('שגיאה בשמירה:', err);
      alert('שגיאה בשמירה');
    }
  };

  const subjectOptions = subjects.map(subject => ({
    value: subject.id,
    label: subject.name,
  }));

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#dbeafe',
      borderRadius: '0.375rem'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1e40af',
      '&:hover': {
        backgroundColor: '#bfdbfe',
        color: '#1e40af'
      }
    })
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6 border border-yellow-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">הוספת מורות</h2>
        <p className="text-gray-600">הוסיפי מורות חדשות עם פרטיהן, תפקיד, מקצועות והיקף משרה</p>
      </div>

      <div className="space-y-6 mb-6">
        {teachers.map((teacher, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">מורה #{i + 1}</span>
              {teachers.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors duration-200"
                  title="מחק מורה"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
  
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">שם מלא</label>
                <input
                  placeholder="שם פרטי ומשפחה"
                  value={teacher.full_name}
                  onChange={e => handleChange(i, 'full_name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">תאריך לידה</label>
                <input
                  type="date"
                  value={teacher.birth_date}
                  onChange={e => handleChange(i, 'birth_date', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">תפקיד</label>
                <select
                  value={teacher.position_id}
                  onChange={e => handleChange(i, 'position_id', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                >
                  <option value="">בחר תפקיד</option>
                  {positions.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">היקף משרה</label>
                <input
                  type="number"
                  placeholder="היקף משרה"
                  value={teacher.teaching_hours}
                  onChange={e => handleChange(i, 'teaching_hours', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                />
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700">מקצועות</label>
                <Select
                  isMulti
                  options={subjectOptions}
                  value={subjectOptions.filter(opt => teacher.subjects.includes(opt.value))}
                  onChange={selected => handleSubjectsChange(i, selected)}
                  placeholder="בחר מקצועות"
                  styles={customSelectStyles}
                  className="min-w-[200px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={addRow}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          הוסף מורה
        </button>

        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
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

export default TeachersForm;
