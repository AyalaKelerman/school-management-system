// import React, { useState } from 'react';

// const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
// const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

// const AssignScheduleForm = ({ studentId, onAssign }) => {
//   const [formData, setFormData] = useState({
//     day: '',
//     hour: '',
//     teacher: '',
//     subject: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.day || !formData.hour) return;
//     onAssign({
//       student_id: studentId,
//       ...formData
//     });
//     setFormData({ day: '', hour: '', teacher: '', subject: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow bg-white grid grid-cols-2 gap-4">
//       <div>
//         <label className="block font-semibold mb-1">יום</label>
//         <select name="day" value={formData.day} onChange={handleChange} className="w-full border rounded px-2 py-1">
//           <option value="">בחר יום</option>
//           {days.map(day => <option key={day} value={day}>{day}</option>)}
//         </select>
//       </div>

//       <div>
//         <label className="block font-semibold mb-1">שעה</label>
//         <select name="hour" value={formData.hour} onChange={handleChange} className="w-full border rounded px-2 py-1">
//           <option value="">בחר שעה</option>
//           {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
//         </select>
//       </div>

//       <div>
//         <label className="block font-semibold mb-1">מורה</label>
//         <input
//           type="text"
//           name="teacher"
//           value={formData.teacher}
//           onChange={handleChange}
//           className="w-full border rounded px-2 py-1"
//           placeholder="הקלד שם מורה"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold mb-1">מקצוע</label>
//         <input
//           type="text"
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           className="w-full border rounded px-2 py-1"
//           placeholder="הקלד מקצוע"
//         />
//       </div>

//       <div className="col-span-2 text-left">
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
//         >
//           הוסף שיבוץ
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AssignScheduleForm;
