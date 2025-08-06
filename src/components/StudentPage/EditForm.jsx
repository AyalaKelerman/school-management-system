// components/EditForm.jsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";

const EditForm = ({ assignment, students, teachers, subjects, onSubmit, onClose }) => {
    console.log({ students, teachers, subjects, assignment });

    const [studentId, setStudentId] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [subjectId, setSubjectId] = useState(null);

    useEffect(() => {
        console.log(students);

        if (assignment) {
            const subject = subjects.find(s => s.name === assignment.subject);
            setStudentId({ label: students[0].full_name, value: students[0].id });
            setTeacherId({ label: assignment.teacher_name, value: assignment.teacher_id });
            setSubjectId({ label: assignment.subject, value: subject.id });
        }
    }, [assignment]);
    console.log('Submitting:', { studentId, teacherId, subjectId });

    const handleSubmit = () => {

        if (studentId && teacherId && subjectId) {
            console.log(assignment);

            onSubmit({
                id: assignment.schedule_id,
                student_id: studentId.value,
                teacher_id: teacherId.value,
                subject_id: subjectId.value,
                day: assignment.day,
                hour: assignment.hour
            });
        }
    };

    return (
        <div className="space-y-4">
            <Select
                options={students.map(s => ({ label: s.full_name, value: s.id }))}
                placeholder="בחר תלמידה"
                value={studentId}
                onChange={setStudentId}
            />
            <Select
                options={teachers.map(t => ({ label: t.full_name, value: t.id }))}
                placeholder="בחר מורה"
                value={teacherId}
                onChange={setTeacherId}
            />
            <Select
                options={subjects.map(s => ({ label: s.name, value: s.id }))}
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
