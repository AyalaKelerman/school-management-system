import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const StudentsListForTeacher = ({ students }) => {
  console.log(students);
  
  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-secondary shadow-sm bg-white">
      <Table>
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead className="text-white px-4 py-3 text-center">תלמידה</TableHead>
            <TableHead className="text-white px-4 py-3 text-center">כיתה</TableHead>
            <TableHead className="text-white px-4 py-3 text-center">תחום לימודי</TableHead>
            <TableHead className="text-white px-4 py-3 text-center">אפיון</TableHead>
            <TableHead className="text-white px-4 py-3 text-center">הערות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-right text-gray-800">
          {students.map((s, idx) => (
            <TableRow key={idx} className="hover:bg-secondary/50 transition duration-150">
              <TableCell className="px-4 py-2">{s.full_name}</TableCell>
              <TableCell className="px-4 py-2">{s.class_name}</TableCell>
              <TableCell className="px-4 py-2">{s.difficulties}</TableCell>
              <TableCell className="px-4 py-2">{s.difficulties}</TableCell>
              <TableCell className="px-4 py-2">{s.remarks || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsListForTeacher;
