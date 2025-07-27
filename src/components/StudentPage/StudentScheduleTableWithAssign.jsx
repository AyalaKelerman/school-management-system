import React from 'react';
import StudentScheduleTable from './StudentScheduleTable';
import AssignScheduleForm from './AssignScheduleForm';

const StudentScheduleTableWithAssign = ({ schedule, student, onAssign, onDelete }) => {
  
  const scheduleArray = Object.entries(schedule).flatMap(([day, hours]) =>
    Object.entries(hours).map(([hour, data]) => ({ day, hour, ...data }))
  );

  const assignedLessons = scheduleArray.filter(item => item.schedule_id);
  const unassignedLessons = scheduleArray.filter(item => !item.schedule_id);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">שיעורים משובצים</h3>
        <StudentScheduleTable
          assignments={assignedLessons.map(item => ({
            ...item,
            teacher_name: item.teacher_name,
            subject_name: item.subject,
            schedule_id: item.schedule_id
          }))}
          onAssign={({ day, hour }) => { }}
          onDelete={onDelete}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">שיבוץ לשיעורים</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unassignedLessons.map((lesson, index) => (
            <AssignScheduleForm
              key={index}
              student={student}
              day={lesson.day}
              hour={lesson.hour}
              onAssign={() => onAssign({
                day: lesson.day,
                hour: lesson.hour,
                subject: lesson.subject,
                teacher_id: lesson.teacher_id,
                student_id: student.id
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentScheduleTableWithAssign;
