import React from 'react';
import StudentsList from './StudentsList';
import ClassSchedule from './ClassSchedule';

const ClassDetails = ({ classData }) => {
  if (!classData) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>כיתה {classData.name}</h2>

      <p><strong>מחנכת:</strong> {classData.teacher_name || 'לא מוגדרת'}</p>

      {/* הצגת רשימת התלמידות */}
      <StudentsList classId={classData.id} />
      <ClassSchedule classId={classData.id} />
    </div>
  );
};

export default ClassDetails;

