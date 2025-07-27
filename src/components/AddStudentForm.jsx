import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../services/api';

const AddStudentForm = ({ onStudentAdded }) => {
  const [fullName, setFullName] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [adaptations, setAdaptations] = useState('');
  const [identification, setIdentification] = useState('');
  const [startYear, setStartYear] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [approvedDoc, setApprovedDoc] = useState(false);
  const [entitledHours, setEntitledHours] = useState('');
  const [availableHours, setAvailableHours] = useState('');

  useEffect(() => {
    API.get('/classes').then(res => setClasses(res.data));
    API.get('/subjects').then(res => {
      const options = res.data.map(sub => ({
        value: sub.name,
        label: sub.name
      }));
      setSubjects(options);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      full_name: fullName,
      class_id: classId,
      difficulties: selectedDifficulties.map(opt => opt.value),
      remarks,
      adaptations,
      identification,
      start_year: Number(startYear),
      coordinator,
      approved_doc: approvedDoc,
      entitled_hours: Number(entitledHours),
      available_hours: Number(availableHours)
    };

    try {
      const res = await API.post('/students', student);
      if (onStudentAdded) onStudentAdded(res.data);

      // ניקוי
      setFullName('');
      setClassId('');
      setSelectedDifficulties([]);
      setRemarks('');
      setAdaptations('');
      setIdentification('');
      setStartYear('');
      setCoordinator('');
      setApprovedDoc(false);
      setEntitledHours('');
      setAvailableHours('');
    } catch (err) {
      alert('שגיאה בהוספת תלמידה');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold text-gray-700">הוספת תלמידה</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">שם תלמידה</label>
        <input
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="שם מלא"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">כיתה</label>
        <select
          value={classId}
          onChange={e => setClassId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">בחרי כיתה</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">תחומי קושי</label>
        <Select
          options={subjects}
          value={selectedDifficulties}
          onChange={setSelectedDifficulties}
          isMulti
          placeholder="בחרי קשיים"
          closeMenuOnSelect={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">הערות</label>
        <input
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="הערות"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">התאמות</label>
        <input
          value={adaptations}
          onChange={e => setAdaptations(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="רישום התאמות"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">איפיון</label>
        <input
          value={identification}
          onChange={e => setIdentification(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="לדוג׳: לקות למידה"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">שנת התחלה</label>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          value={startYear}
          onChange={e => setStartYear(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="למשל 2023"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">רכזת</label>
        <input
          value={coordinator}
          onChange={e => setCoordinator(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="שם רכזת"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={approvedDoc}
          onChange={e => setApprovedDoc(e.target.checked)}
          id="approved_doc"
        />
        <label htmlFor="approved_doc" className="text-sm text-gray-700">
          קיים מסמך קביל
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">שעות זכאות</label>
        <input
          type="number"
          value={entitledHours}
          onChange={e => setEntitledHours(e.target.value)}
          placeholder="שעות זכאות"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">שעות זמינות</label>
        <input
          type="number"
          value={availableHours}
          onChange={e => setAvailableHours(e.target.value)}
          placeholder="שעות זמינות"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
      >
        הוספת תלמידה
      </button>
    </form>
  );
};

export default AddStudentForm;
