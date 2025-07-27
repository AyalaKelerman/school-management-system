// components/AssignForm.jsx
import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const AssignForm = ({ students, teachers, subjects, onSubmit, onCancel }) => {
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  const handleSubmit = () => {
    if (studentId && teacherId && subjectId) {
      onSubmit({
        student_id: studentId.value,
        teacher_id: teacherId.value,
        subject_id: subjectId.value,
      });
    }
  };

  return (
    <div className="space-y-4">
      <Select
        options={students.map(s => ({ label: s.full_name, value: s.id }))}
        placeholder="בחר תלמידה"
        onChange={setStudentId}
      />
      <Select
        options={teachers.map(t => ({ label: t.full_name, value: t.id }))}
        placeholder="בחר מורה"
        onChange={setTeacherId}
      />
      <Select
        options={subjects.map(s => ({ label: s.name, value: s.id }))}
        placeholder="בחר מקצוע"
        onChange={setSubjectId}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>ביטול</Button>
        <Button onClick={handleSubmit}>שמור</Button>
      </div>
    </div>
  );
};

export default AssignForm;
