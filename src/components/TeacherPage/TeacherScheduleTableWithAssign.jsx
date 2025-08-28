import React, { useState } from "react";
import TeacherScheduleTable from "./TeacherScheduleTable";

const TeacherScheduleTableWithAssign = ({ schedule = [], teacher, students = [], subjects = [], onAssign, onUpdate, onDelete, fetchSchedule }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleAssign = (day, hour) => {
        setSelectedSlot({ day, hour });
    };

    const handleEdit = (assignment) => {
        setSelectedSlot(assignment);
    };

    return (
        <TeacherScheduleTable
            schedule={schedule}
            teachers={[teacher]}
            students={students}
            subjects={subjects}
            onAssign={onAssign}
            onEdit={onUpdate}
            onDelete={onDelete}
        />
    );
};

export default TeacherScheduleTableWithAssign;
