import React, { useState, useEffect } from 'react';
import API from '../services/api';
import StudentsSummaryTable from '../components/StudentPage/StudentsSummaryTable';
import StudentScheduleTableWithAssign from '../components/StudentPage/StudentScheduleTableWithAssign';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get('/students').then(res => setStudents(res.data));
    API.get('/teachers').then(res => setTeachers(res.data));
    API.get('/subjects').then(res => setSubjects(res.data));
  }, []);

  const formatSchedule = (flatSchedule) => {
    const grouped = {};
    flatSchedule.forEach((entry) => {
      if (!grouped[entry.day]) grouped[entry.day] = {};
      grouped[entry.day][entry.hour] = {
        subject: entry.subject,
        teacher_name: entry.teacher_name,
        teacher_id: entry.teacher_id,
        schedule_id: entry.id
      };
    });
    return grouped;
  };

  const fetchSchedule = async () => {
    if (selectedStudent) {
      const updated = await API.get(`/schedules?student_id=${selectedStudent.id}`);
      const grouped = formatSchedule(updated.data);
      setSchedule(grouped);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      fetchSchedule();
    }
  }, [selectedStudent]);

  const handleAssign = async (data) => {
    await API.post('/schedules', data);
    fetchSchedule();
  };

  const handleDelete = async (scheduleId) => {
    await API.delete(`/schedules/${scheduleId}`);
    fetchSchedule();
  };

  const filtered = students.filter((s) => s.full_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <Input placeholder="חיפוש תלמידה לפי שם..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <StudentsSummaryTable students={filtered} onSelectStudent={setSelectedStudent} />
      </Card>

      {selectedStudent && (
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-2">מערכת תלמידה: {selectedStudent.full_name}</h2>
          <StudentScheduleTableWithAssign
            schedule={schedule}
            student={selectedStudent}
            onAssign={handleAssign}
            onDelete={handleDelete}
            teachers={teachers}
            subjects={subjects}
            fetchSchedule={fetchSchedule}
          />
        </Card>
      )}
    </div>
  );
};

export default StudentsPage;
