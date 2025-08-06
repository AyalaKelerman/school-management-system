import React from 'react';
import StudentScheduleTable from './StudentScheduleTable';
import API from '../../services/api';

const StudentScheduleTableWithAssign = ({ schedule, student, onAssign, onDelete, teachers, subjects, fetchSchedule }) => {
  const scheduleArray = Object.entries(schedule).flatMap(([day, hours]) =>
    Object.entries(hours).map(([hour, data]) => ({ day, hour, ...data }))
  );

  const assignedLessons = scheduleArray.filter(item => item.schedule_id);

  const handleUpdate = async (updatedAssignment) => {
    try {
      const subject = subjects.find(s => s.id === updatedAssignment.subject_id)?.name || '';

      console.log('>>> עדכון נתונים:', {
        day: updatedAssignment.day,
        hour: updatedAssignment.hour,
        student_id: updatedAssignment.student_id,
        subject,
        teacher_id: updatedAssignment.teacher_id,
      });

      const response = await API.put(`/schedules/${updatedAssignment.id}`, {
        day: updatedAssignment.day || '',
        hour: updatedAssignment.hour || '',
        student_id: updatedAssignment.student_id,
        subject,
        teacher_id: updatedAssignment.teacher_id,
      });

      console.log('עודכן בהצלחה:', response.data);

      if (fetchSchedule) fetchSchedule();

    } catch (error) {
      console.error('שגיאה בעדכון שיבוץ:', error);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <StudentScheduleTable
        assignments={scheduleArray}
        onDelete={onDelete}
        onAssign={onAssign}
        onUpdate={handleUpdate}
        students={[student]}
        teachers={teachers}
        subjects={subjects}
      />
    </div>
  );
};

export default StudentScheduleTableWithAssign;
