import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClassesPage from '../pages/ClassesPage';
import TeachersPage from '../pages/TeachersPage';
import StudentsPage from '../pages/StudentsPage';
import AssistancePage from '../pages/AssistancePage';
import TreatmentsPage from '../pages/TreatmentsPage';
import SchedulePage from '../pages/SchedulePage';
import SummaryPage from '../pages/SummaryPage';
import ManageDataPage from '../pages/DataEntryPage';

const AppRouter = () => (
  <Routes>
    <Route path='/' element={<ClassesPage />} />
    <Route path="/classes" element={<ClassesPage />} />
    <Route path="/teachers" element={<TeachersPage />} />
    <Route path="/students" element={<StudentsPage />} />
    <Route path="/assistance" element={<AssistancePage />} />
    <Route path="/treatments" element={<TreatmentsPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/summary" element={<SummaryPage />} />
    <Route path="/manage-data" element={<ManageDataPage />} />
  </Routes>
);

export default AppRouter;
