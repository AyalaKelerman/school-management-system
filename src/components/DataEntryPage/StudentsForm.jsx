import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import { Plus, Trash2, Upload, Save, Download, User2 } from 'lucide-react';

const createEmptyStudent = () => ({
  full_name: '',
  class_id: '',
  difficulties: [],
  remarks: '',
  adjustments: '',
  characterization: '',
  start_year: '',
  coordinator: '',
  has_valid_document: false,
  entitled_hours: '',
  available_hours: '',
});

const StudentsForm = () => {
  const [students, setStudents] = useState([createEmptyStudent()]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    API.get('/classes').then(res => setClasses(res.data));
    API.get('/subjects').then(res => setSubjects(res.data));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: value };
    setStudents(updated);
  };

  const addRow = () => setStudents([...students, createEmptyStudent()]);
  const removeRow = (index) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const classMap = {};
      classes.forEach(cls => {
        if (cls.name) {
          classMap[cls.name.trim()] = cls.id;
        }
      });

      const formatted = data
        .map(row => {
          const rawClass = row.class_name ?? row.class_id ?? '';
          const className = typeof rawClass === 'string' ? rawClass.trim() : '';
          const class_id = classMap[className];

          if (!class_id) {
            console.warn(`⚠️ הכיתה "${className}" לא קיימת במסד הנתונים`);
            return null;
          }

          return {
            full_name: row.full_name || '',
            class_id,
            difficulties: row.difficulties ? row.difficulties.split(',').map(s => s.trim()) : [],
            remarks: row.remarks || '',
            adjustments: row.adjustments || '',
            characterization: row.characterization || '',
            start_year: row.start_year || '',
            coordinator: row.coordinator || '',
            has_valid_document: row.has_valid_document === true || row.has_valid_document === 'true',
            entitled_hours: row.entitled_hours || '',
            available_hours: row.available_hours || '',
          };
        })
        .filter(s => s && s.full_name && s.class_id);

      if (formatted.length === 0) {
        alert('⚠️ לא נמצאו תלמידות תקינות בקובץ');
      } else {
        setStudents(formatted);
        alert('✅ ייבוא הקובץ הושלם בהצלחה');
      }

      setIsLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleDownloadExample = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        full_name: 'רוני כהן',
        class_name: 'א1',
        difficulties: 'חשבון, קריאה',
        remarks: 'מתקדמת יפה',
        adjustments: 'הקראת שאלות',
        characterization: 'ADHD',
        start_year: 2022,
        coordinator: 'טליה',
        has_valid_document: true,
        entitled_hours: 4,
        available_hours: 3
      }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students Example');
    XLSX.writeFile(wb, 'example_students.xlsx');
  };

  const handleSave = async () => {
    const validStudents = students.filter(s => s.full_name && s.class_id);
    if (validStudents.length === 0) {
      alert('יש למלא לפחות תלמידה אחת עם שם וכיתה');
      return;
    }
    try {
      setIsLoading(true);
      await API.post('/students/bulk', validStudents);
      alert('התלמידות נשמרו בהצלחה');
      setStudents([createEmptyStudent()]);
    } catch (err) {
      console.error(err);
      alert('שגיאה בשמירה');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = students.every(s => s.full_name.trim() && s.class_id);
  const classOptions = classes.map(cls => ({ value: cls.id, label: cls.name }));
  const difficultyOptions = subjects.map(subject => ({ value: subject.name, label: subject.name }));

  const customSelectStyles = {
    control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: '#d1d5db' }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-pink-50 via-rose-50 to-amber-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl shadow-lg mb-4">
            <User2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">הוספת תלמידות למערכת</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">הוסיפי תלמידות עם כל הפרטים או ייבאי מקובץ Excel</p>
        </div>

        {/* Excel Upload + Example Download */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">ייבוא מקובץ Excel</h3>
                <p className="text-sm text-gray-500">עמודות חובה: full_name, class_name</p>
              </div>
            </div>
            <div className="flex gap-3">
              <label className="relative">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl">
                  בחר קובץ
                </button>
              </label>
              <button onClick={handleDownloadExample} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2">
                <Download size={16} />
                קובץ לדוגמה
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {isFormValid ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">מוכן לשמירה</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-amber-700 font-medium">יש למלא את כל השדות החיוניים</span>
            </>
          )}
        </div>

        {/* Students Form */}
        <div className="space-y-6">
          {students.map((student, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="שם מלא" value={student.full_name} onChange={e => handleChange(i, 'full_name', e.target.value)} />
                <SelectField label="כיתה" value={student.class_id} options={classOptions} onChange={e => handleChange(i, 'class_id', e.target.value)} />
                <MultiSelectField label="תחומי קושי" options={difficultyOptions} value={student.difficulties} onChange={vals => handleChange(i, 'difficulties', vals)} styles={customSelectStyles} />
                <InputField label="הערות" value={student.remarks} onChange={e => handleChange(i, 'remarks', e.target.value)} />
                <InputField label="התאמות" value={student.adjustments} onChange={e => handleChange(i, 'adjustments', e.target.value)} />
                <InputField label="איפיון" value={student.characterization} onChange={e => handleChange(i, 'characterization', e.target.value)} />
                <InputField label="שנת התחלה" type="number" value={student.start_year} onChange={e => handleChange(i, 'start_year', e.target.value)} />
                <InputField label="רכזת" value={student.coordinator} onChange={e => handleChange(i, 'coordinator', e.target.value)} />
                <InputField label="שעות זכאות" type="number" value={student.entitled_hours} onChange={e => handleChange(i, 'entitled_hours', e.target.value)} />
                <InputField label="שעות זמינות" type="number" value={student.available_hours} onChange={e => handleChange(i, 'available_hours', e.target.value)} />
                <CheckboxField label="מסמך קביל קיים" checked={student.has_valid_document} onChange={e => handleChange(i, 'has_valid_document', e.target.checked)} />
              </div>
              {students.length > 1 && (
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeRow(i)} className="text-red-500 hover:text-red-700">מחק</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <button onClick={addRow} className="bg-green-500 text-white px-6 py-3 rounded-lg">הוסף תלמידה</button>
          <button onClick={handleSave} disabled={isLoading || !isFormValid} className="bg-pink-500 text-white px-6 py-3 rounded-lg disabled:opacity-50">שמור הכל</button>
        </div>
      </div>
    </div>
  );
};

// Input Components
const InputField = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input {...props} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
  </div>
);

const SelectField = ({ label, value, options, onChange }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select value={value} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-4 py-2">
      <option value="">בחר</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const MultiSelectField = ({ label, options, value, onChange, styles }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Select
      isMulti
      options={options}
      value={value.map(val => ({ value: val, label: val }))}
      onChange={selected => onChange(selected.map(s => s.value))}
      styles={styles}
    />
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <div className="flex items-center space-x-2 mt-2">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label className="text-sm text-gray-700">{label}</label>
  </div>
);

export default StudentsForm;
