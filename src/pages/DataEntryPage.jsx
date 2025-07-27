// pages/DataEntryPage.jsx
import React from 'react';
import TeachersForm from '../components/DataEntryPage/TeachersForm';
import StudentsForm from '../components/DataEntryPage/StudentsForm';
import ClassesForm from '../components/DataEntryPage/ClassesForm';
import RolesForm from '../components/DataEntryPage/RolesForm';
import SubjectsForm from '../components/DataEntryPage/SubjectsForm';

const DataEntryPage = () => {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">הזנת נתונים למערכת</h1>

      <div className="border p-4 rounded shadow-sm">
        <ClassesForm />
      </div>

      <div className="border p-4 rounded shadow-sm">
        <StudentsForm />
      </div>

      <div className="border p-4 rounded shadow-sm">
        <TeachersForm />
      </div>

      <div className="border p-4 rounded shadow-sm">
        <SubjectsForm />
      </div>

      <div className="border p-4 rounded shadow-sm">
        <RolesForm />
      </div>
    </div>
  );
};

export default DataEntryPage;