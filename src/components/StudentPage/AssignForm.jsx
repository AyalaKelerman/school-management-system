import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const AssignForm = ({ day, hour, students, teachers, subjects, onSubmit, onClose, occupiedTeachers = [] }) => {
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  const teacherOptions = teachers.map((t) => {
    const isBusy = occupiedTeachers.includes(t.id);
    return {
      label: isBusy ? `⚠ ${t.full_name} (תפוסה)` : t.full_name,
      value: t.id,
      isDisabled: isBusy,
    };
  });

  const handleSubmit = () => {
    if (studentId && teacherId && subjectId) {
      onSubmit({
        day,
        hour,
        student_id: studentId.value,
        teacher_id: teacherId.value,
        subject: subjectId.label, // ה־API שלך מקבל subject כשם (string)
      });
    }
  };

  return (
    <div className="space-y-4">
      <Select
        options={students.map((s) => ({ label: s.full_name, value: s.id }))}
        placeholder="בחר תלמידה"
        onChange={setStudentId}
      />
      <Select
        options={teacherOptions}
        placeholder="בחר מורה"
        onChange={setTeacherId}
      />
      <Select
        options={subjects.map((s) => ({ label: s.name, value: s.id }))}
        placeholder="בחר מקצוע"
        onChange={setSubjectId}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>ביטול</Button>
        <Button onClick={handleSubmit}>שמור</Button>
      </div>
    </div>
  );
};

export default AssignForm;
