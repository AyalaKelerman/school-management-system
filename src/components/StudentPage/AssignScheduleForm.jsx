import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
const hours = [1, 2, 3, 4, 5, 6, 7];

const AssignScheduleForm = ({ student, day, hour, onAssign }) => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    day: day || '',
    hour: hour || '',
    subject: '',
    teacher_id: ''
  });

  useEffect(() => {
    API.get('/teachers').then((res) => setTeachers(res.data));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/schedules', {
        ...form,
        student_id: student.id
      });
      alert('השיבוץ נשמר בהצלחה');
      if (onAssign) onAssign();
    } catch (err) {
      console.error('שגיאה בשמירת שיבוץ:', err);
      alert('אירעה שגיאה בשמירה');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>יום</Label>
          <Input disabled value={form.day} />
        </div>
        <div>
          <Label>שעה</Label>
          <Input disabled value={form.hour} />
        </div>
        <div className="col-span-2">
          <Label>מקצוע</Label>
          <Input value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} placeholder="למשל: חשבון" />
        </div>
        <div className="col-span-2">
          <Label>מורה</Label>
          <Select onValueChange={(val) => handleChange('teacher_id', val)}>
            <SelectTrigger><SelectValue placeholder="בחר מורה" /></SelectTrigger>
            <SelectContent>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>{t.full_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full">שמור שיבוץ</Button>
    </form>
  );
};

export default AssignScheduleForm;
