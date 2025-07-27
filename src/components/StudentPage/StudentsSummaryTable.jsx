import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const StudentsSummaryTable = ({ students, onSelectStudent }) => {
  return (
    <Table className="mt-4">
      <TableHeader className="bg-primary text-white">
        <TableRow>
          <TableHead className="text-white">שם</TableHead>
          <TableHead className="text-white">כיתה</TableHead>
          <TableHead className="text-white">תחומי קושי</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((s) => (
          <TableRow
            key={s.id}
            className="cursor-pointer hover:bg-muted"
            onClick={() => onSelectStudent(s)}
          >
            <TableCell>{s.full_name}</TableCell>
            <TableCell>{s.class_name}</TableCell>
            <TableCell>{s.difficulties?.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsSummaryTable;
