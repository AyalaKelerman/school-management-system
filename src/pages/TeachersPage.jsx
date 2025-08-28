import React, { useEffect, useState } from "react";
import API from "../services/api";
import TeacherScheduleTableWithAssign from "../components/TeacherPage/TeacherScheduleTableWithAssign";
import AddTeacherForm from "../components/TeacherPage/AddTeacherForm";
import TeacherSummaryTable from "../components/TeacherPage/TeacherSummaryTable";
import StudentsListForTeacher from "../components/TeacherPage/StudentsListForTeacher";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const TeachersPage = () => {
  const [summary, setSummary] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchSubjects();
  }, []);

  // סיכום מורות
  const fetchSummary = async () => {
    const res = await API.get("/teachers/summary");
    setSummary(res.data);
  };

  // טעינת מקצועות
  const fetchSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data);
  };

  // טעינת נתוני מורה ספציפית
  const handleTeacherClick = async (teacherId) => {
    const selected = summary.find((t) => t.id === teacherId);
    setSelectedTeacher(selected);

    const [studentsRes, scheduleRes] = await Promise.all([
      API.get(`/students/by-teacher/${teacherId}`),
      API.get(`/schedules/by-teacher/${teacherId}`),
    ]);

    setStudents(studentsRes.data);
    setSchedule(scheduleRes.data);
  };

  const handleBack = () => {
    setSelectedTeacher(null);
    setStudents([]);
    setSchedule([]);
  };

  // הוספת שיבוץ
  const handleAssign = async (assignment) => {
    try {
      await API.post("/schedules", assignment);
      await handleTeacherClick(selectedTeacher.id);
    } catch (err) {
      console.error("שגיאה בהוספת שיבוץ:", err);
    }
  };

  // מחיקת שיבוץ
  const handleDelete = async (scheduleId) => {
    console.log("Deleting schedule ID:", scheduleId);
    
    try {
      await API.delete(`/schedules/${scheduleId}`);
      await handleTeacherClick(selectedTeacher.id);
    } catch (err) {
      console.error("שגיאה במחיקת שיבוץ:", err);
    }
  };

  const handleUpdate = async (assignment) => {
    try {
      await API.put(`/schedules/${assignment.id}`, assignment);
      await handleTeacherClick(selectedTeacher.id);
    } catch (err) {
      console.error("שגיאה בעדכון שיבוץ:", err);
    }
  };

  // סינון לפי בחירה מרובה
  const filteredTeachers =
    selectedOptions.length === 0
      ? summary
      : summary.filter((t) =>
        selectedOptions.some((opt) => opt.value === t.id)
      );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto rtl space-y-8">
      <h2 className="text-3xl font-bold text-header text-center">ניהול מורות</h2>

      <AddTeacherForm onTeacherAdded={fetchSummary} />

      {!selectedTeacher && (
        <div className="space-y-4">
          {/* חיפוש */}
          <div className="max-w-xl mx-auto">
            <label className="block text-right text-sm font-semibold mb-2 text-primaryDark">
              חיפוש מורות
            </label>
            <Select
              isMulti
              isRtl
              options={summary.map((t) => ({ label: t.full_name, value: t.id }))}
              onChange={setSelectedOptions}
              value={selectedOptions}
              placeholder="בחר מורות..."
              className="text-right"
            />
          </div>

          <h3 className="text-xl font-semibold text-primaryDark">רשימת מורות</h3>
          <TeacherSummaryTable data={filteredTeachers} onSelect={handleTeacherClick} />
        </div>
      )}

      {selectedTeacher && (
        <div className="space-y-6">
          {/* כפתור חזרה */}
          <div className="flex justify-end">
            <Button
              onClick={handleBack}
              className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded shadow"
            >
              חזרה לכל המורות
            </Button>
          </div>

          {/* פרטים אישיים */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primaryDark">פרטים אישיים</h3>
            <div className="overflow-x-auto rounded border border-tableBorder bg-white">
              <table className="w-full text-center text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-3 py-2">שם</th>
                    <th className="px-3 py-2">היקף משרה</th>
                    <th className="px-3 py-2">הוראה</th>
                    <th className="px-3 py-2">ריכוז</th>
                    <th className="px-3 py-2">סיוע</th>
                    <th className="px-3 py-2">מספר תלמידות</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-secondary/50">
                    <td className="px-3 py-2">{selectedTeacher.full_name}</td>
                    <td className="px-3 py-2">{selectedTeacher.teaching_hours}</td>
                    <td className="px-3 py-2">{selectedTeacher.teaching_hours}</td>
                    <td className="px-3 py-2">{selectedTeacher.ricuz}</td>
                    <td className="px-3 py-2">{selectedTeacher.siyua}</td>
                    <td className="px-3 py-2">{selectedTeacher.total_students}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* רשימת תלמידות */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-primaryDark">רשימת תלמידות</h4>
            <StudentsListForTeacher students={students} />
          </div>

          {/* מערכת שעות */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-primaryDark">מערכת שעות</h4>
            <TeacherScheduleTableWithAssign
              schedule={schedule}
              teacher={selectedTeacher}
              students={students}
              subjects={subjects}
              onAssign={handleAssign}
              onUpdate={handleUpdate} 
              onDelete={handleDelete}
              fetchSchedule={() => handleTeacherClick(selectedTeacher.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
