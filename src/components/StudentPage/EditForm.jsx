import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

/**
 * הערות חשובות:
 * - occupiedTeachers: IDs של מורות תפוסות ביום/שעה של הסלוט הנוכחי.
 * - אם המורה הנוכחית של הסלוט נמצאת ב-occupiedTeachers (כי היא "תפוסה" בעצם על אותו סלוט),
 *   לא נחסום אותה כדי לאפשר להשאיר אותה/לבצע שינוי אחר בשאר השדות.
 */
const EditForm = ({ assignment, students, teachers, subjects, onSubmit, onClose, occupiedTeachers = [] }) => {
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);

  useEffect(() => {
    if (assignment) {
      const subject = subjects.find((s) => s.name === assignment.subject);
      // בהקשר של StudentScheduleTableWithAssign את שולחת תמיד students=[student] אחת
      const defaultStudent = students?.[0];
      setStudentId(defaultStudent ? { label: defaultStudent.full_name, value: defaultStudent.id } : null);
      setTeacherId({ label: assignment.teacher_name, value: assignment.teacher_id });
      setSubjectId(subject ? { label: subject.name, value: subject.id } : null);
    }
  }, [assignment, students, subjects]);

  const teacherOptions = useMemo(() => {
    const currentTeacherId = assignment?.teacher_id;
    return teachers.map((t) => {
      const isBusy = occupiedTeachers.includes(t.id) && t.id !== currentTeacherId; // אל תחסום את המורה הנוכחית
      return {
        label: isBusy ? `⚠ ${t.full_name} (תפוסה)` : t.full_name,
        value: t.id,
        isDisabled: isBusy,
      };
    });
  }, [teachers, occupiedTeachers, assignment?.teacher_id]);

  const handleSubmit = () => {
    if (studentId && teacherId && subjectId) {
      onSubmit({
        id: assignment.schedule_id,
        student_id: studentId.value,
        teacher_id: teacherId.value,
        subject_id: subjectId.value, // יומר ל-name בצד העוטף (StudentScheduleTableWithAssign)
        day: assignment.day,
        hour: assignment.hour,
      });
    }
  };

  return (
    <div className="space-y-4">
      <Select
        options={students.map((s) => ({ label: s.full_name, value: s.id }))}
        placeholder="בחר תלמידה"
        value={studentId}
        onChange={setStudentId}
      />
      <Select
        options={teacherOptions}
        placeholder="בחר מורה"
        value={teacherId}
        onChange={setTeacherId}
      />
      <Select
        options={subjects.map((s) => ({ label: s.name, value: s.id }))}
        placeholder="בחר מקצוע"
        value={subjectId}
        onChange={setSubjectId}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onClose}>ביטול</Button>
        <Button onClick={handleSubmit}>עדכן</Button>
      </div>
    </div>
  );
};

export default EditForm;
