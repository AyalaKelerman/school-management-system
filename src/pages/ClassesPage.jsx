import React, { useEffect, useState } from 'react';
import API from '../services/api';
import GradeSelector from '../components/GradeSelector';
import ClassList from '../components/ClassList';
import ClassDetails from '../components/ClassDetails';
import AddClassForm from '../components/AddClassForm';

const ClassesPage = () => {
    const [selectedGrade, setSelectedGrade] = useState('');
    const [grades, setGrades] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    // שליפת כיתות ומחזורים
    useEffect(() => {
        API.get('/classes').then(res => setAllClasses(res.data));
        API.get('/grades').then(res => {
            setGrades(res.data);
            if (res.data.length > 0) setSelectedGrade(res.data[0].name);
        });
    }, []);

    useEffect(() => {
        const filtered = allClasses.filter(c => c.name.startsWith(selectedGrade));
        setFilteredClasses(filtered);
        setSelectedClass(null);
    }, [selectedGrade, allClasses]);

    // פונקציה שמוסיפה מחזור אם הוא לא קיים
    const addGradeIfNeeded = (gradeName) => {
        const exists = grades.some(g => g.name === gradeName);
        if (!exists) {
            setGrades(prev => [...prev, { name: gradeName }]);
        }
    };

    return (
        <div>
            <h1>ניהול כיתות</h1>
            <GradeSelector
                selected={selectedGrade}
                onSelect={setSelectedGrade}
                grades={grades}
            />
            <ClassList classes={filteredClasses} onSelect={setSelectedClass} />
            <ClassDetails classData={selectedClass} />
            <AddClassForm
                onAdd={(newClass) => {
                    setAllClasses(prev => [...prev, newClass]);
                    addGradeIfNeeded(newClass.name.charAt(0));
                }}
            />
        </div>
    );
};

export default ClassesPage;
