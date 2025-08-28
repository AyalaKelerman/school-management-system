import React, { useMemo } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const AssignForm = ({ day, hour, students, teachers, subjects, occupiedStudents, onSubmit, onClose }) => {
  const [studentId, setStudentId] = React.useState(null);
  const [teacherId, setTeacherId] = React.useState(null);
  const [subjectId, setSubjectId] = React.useState(null);

  const studentOptions = useMemo(() => {
    return (students || []).map((s) => {
      const isBusy = (occupiedStudents || []).includes(s.id);
      return {
        label: isBusy ? `⚠ ${s.full_name} (תפוסה)` : s.full_name,
        value: s.id,
        isDisabled: isBusy,
      };
    });
  }, [students, occupiedStudents]);

  const handleSubmit = () => {
    if (!studentId || !teacherId || !subjectId) return;

    const selectedSubject = (subjects || []).find(s => s.id === subjectId.value);

    onSubmit({
      day,
      hour,
      student_id: studentId.value,
      teacher_id: teacherId.value,
      subject_id: subjectId.value,
      subject: selectedSubject?.name || "",
    });
  };

  return (
    <div className="space-y-4">
      <Select options={studentOptions} placeholder="בחר תלמידה" value={studentId} onChange={setStudentId} />
      <Select options={(teachers || []).map(t => ({ label: t.full_name, value: t.id }))} placeholder="בחר מורה" value={teacherId} onChange={setTeacherId} />
      <Select options={(subjects || []).map(s => ({ label: s.name, value: s.id }))} placeholder="בחר מקצוע" value={subjectId} onChange={setSubjectId} />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>ביטול</Button>
        <Button onClick={handleSubmit}>שמור</Button>
      </div>
    </div>
  );
};

export default AssignForm;
