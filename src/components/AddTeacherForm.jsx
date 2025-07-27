import React, { useState } from 'react';
import API from '../services/api';

const AddTeacherForm = ({ onTeacherAdded }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    position: '',
    teaching_hours: '',
    subjects: '',
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/teachers', formData);
      alert('המורה נוספה בהצלחה!');
      onTeacherAdded?.(res.data);
      setFormData({
        full_name: '',
        birth_date: '',
        position: '',
        teaching_hours: '',
        subjects: '',
      });
    } catch (err) {
      console.error(err);
      alert('שגיאה בהוספת מורה');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl">
      <h3 className="text-xl font-semibold text-center text-primaryDark mb-4">הוספת מורה חדשה</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="full_name"
          placeholder="שם מלא"
          value={formData.full_name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          required
        />
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          required
        />
        <input
          type="text"
          name="position"
          placeholder="תפקיד (לדוגמה: מורת שילוב)"
          value={formData.position}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          required
        />
        <input
          type="number"
          name="teaching_hours"
          placeholder="שעות הוראה"
          value={formData.teaching_hours}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          required
        />
        <input
          type="text"
          name="subjects"
          placeholder="מקצועות (מופרדים בפסיקים)"
          value={formData.subjects}
          onChange={handleChange}
          className="col-span-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          required
        />
      </div>
      <div className="mt-4 text-center">
        <button
          type="submit"
          className="bg-primary hover:bg-primaryDark text-white font-semibold px-6 py-2 rounded shadow transition duration-150"
        >
          הוספה
        </button>
      </div>
    </form>
  );
};

export default AddTeacherForm;
