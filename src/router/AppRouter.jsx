import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClassesPage from '../pages/ClassesPage';
import TeachersPage from '../pages/TeachersPage';
import StudentsPage from '../pages/StudentsPage';
import AssistancePage from '../pages/AssistancePage';
import TreatmentsPage from '../pages/TreatmentsPage';
import SchedulePage from '../pages/SchedulePage';
import SummaryPage from '../pages/SummaryPage';
import ManageDataPage from '../pages/DataEntryPage';
import LoginPage from '../pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<ClassesPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/assistance" element={<AssistancePage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/manage-data" element={<ManageDataPage />} />
          </Routes>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRouter;
