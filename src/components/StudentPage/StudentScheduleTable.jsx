import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal"; // נניח שיש קומפוננטת מודל
import { Pencil, Trash2, Plus } from "lucide-react";
import AssignForm from "./AssignForm";
import EditForm from "./EditForm";

const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
const hours = [1, 2, 3, 4, 5, 6, 7, 8];

const StudentScheduleTable = ({ assignments, onAssign, onUpdate, onDelete, students, teachers, subjects }) => {

  const [modalData, setModalData] = useState(null);

  const openAssignModal = (day, hour) => {
    setModalData({ type: "assign", day, hour });
  };

  const openEditModal = (assignment) => {
    setModalData({ type: "edit", ...assignment });
  };

  const closeModal = () => setModalData(null);

  const getAssignment = (day, hour) => {
    return (assignments || []).find(
      (a) => String(a.day) === String(day) && Number(a.hour) === Number(hour)
    );
  };

  return (
    <div className="overflow-x-auto rounded border shadow-sm">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">שעה \ יום</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="border p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="border p-2 font-bold text-center">{hour}</td>
              {daysOfWeek.map((day) => {
                const assignment = getAssignment(day, hour);
                return (
                  <td key={`${day}-${hour}`} className="border p-2 text-center">
                    {assignment ? (
                      <div className="space-y-1">
                        <div className="font-semibold">{assignment.subject}</div>
                        <div className="text-xs text-gray-600">{assignment.teacher_name}</div>
                        <div className="flex justify-center gap-1 mt-1">
                          <Button size="sm" variant="outline" onClick={() => openEditModal(assignment)}>
                            <Pencil size={14} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => onDelete(assignment.schedule_id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => openAssignModal(day, hour)}>
                        <Plus size={16} /> שיבוץ
                      </Button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <div className="mt-6 p-4 border rounded bg-white shadow-md max-w-lg mx-auto">
          {modalData.type === "assign" ? (
            <AssignForm
              day={modalData.day}
              hour={modalData.hour}
              students={students}
              teachers={teachers}
              subjects={subjects}
              onSubmit={onAssign}
              onClose={closeModal}
            />
          ) : (
            <EditForm
              assignment={modalData}
              onSubmit={onUpdate}
              onClose={closeModal}
              students={students}
              teachers={teachers}
              subjects={subjects}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StudentScheduleTable;
