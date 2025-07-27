import React, { useState } from 'react';
import { Plus, Trash2, Upload, Save, BookOpen, User, GraduationCap } from 'lucide-react';

const emptyClass = { name: '', teacher_name: '' };

const ClassesForm = ({ refreshClasses }) => {
  const [classes, setClasses] = useState([{ ...emptyClass }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...classes];
    updated[index][field] = value;
    setClasses(updated);
  };

  const extractGradeFromClassName = (className) => {
    return className.replace(/[0-9]/g, '').trim();
  };

  const addRow = () => {
    setClasses([...classes, { ...emptyClass }]);
  };

  const removeRow = (index) => {
    if (classes.length > 1) {
      const updated = classes.filter((_, i) => i !== index);
      setClasses(updated);
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const mockData = [
        { name: 'א1', teacher_name: 'מיכל כהן' },
        { name: 'א2', teacher_name: 'שרה לוי' }
      ];
      
      setClasses(mockData);
      setIsLoading(false);
      alert('קובץ Excel נטען בהצלחה!');
    }, 1500);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    const payload = classes.map(cls => ({
      name: cls.name,
      teacherName: cls.teacher_name,
      gradeName: extractGradeFromClassName(cls.name),
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('הכיתות נשמרו בהצלחה');
      setClasses([{ ...emptyClass }]);
      if (refreshClasses) refreshClasses();
    } catch (err) {
      console.error('שגיאה בשמירה:', err);
      alert('שגיאה בשמירה');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = classes.every(cls => cls.name.trim() && cls.teacher_name.trim());

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* כותרת מרכזית */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            הוספת כיתות למערכת
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            הוסיפי כיתות חדשות עם פרטי המחנכות - ייבוא מקובץ או הוספה ידנית
          </p>
        </div>

        {/* ייבוא Excel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">ייבוא מקובץ Excel</h3>
                <p className="text-sm text-gray-500">עמודות נדרשות: name, teacher_name</p>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isLoading}
              />
              <button
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 font-medium"
              >
                {isLoading ? 'טוען...' : 'בחר קובץ'}
              </button>
            </div>
          </div>
        </div>

        {/* כיתות - תצוגה קומפקטית */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">כיתות במערכת</h3>
                <p className="text-sm text-gray-500">{classes.length} כיתות</p>
              </div>
            </div>
            
            <button
              onClick={addRow}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>הוסף כיתה</span>
            </button>
          </div>

          <div className="space-y-4">
            {classes.map((cls, i) => (
              <div
                key={i}
                className="group bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="font-medium text-gray-700">כיתה {i + 1}</span>
                    {cls.name && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {extractGradeFromClassName(cls.name) || 'לא זוהה'}
                      </span>
                    )}
                  </div>
                  
                  {classes.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="opacity-0 group-hover:opacity-100 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-all duration-200"
                      title="מחק כיתה"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* שם הכיתה */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם הכיתה
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        placeholder="למשל: א1, ב2, ג3"
                        value={cls.name}
                        onChange={e => handleChange(i, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* שם המחנכת */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם המחנכת
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        placeholder="שם מלא של המחנכת"
                        value={cls.teacher_name}
                        onChange={e => handleChange(i, 'teacher_name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* כפתור שמירה וסטטוס */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {!isFormValid ? (
                <>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="text-amber-700 font-medium">יש למלא את כל השדות</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">מוכן לשמירה</span>
                </>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={isLoading || !isFormValid}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>שומר...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>שמור כיתות ({classes.length})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesForm;