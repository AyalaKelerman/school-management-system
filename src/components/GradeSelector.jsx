// במקום לקרוא ל-API, נקבל props
const GradeSelector = ({ selected, onSelect, grades }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {grades.map(grade => (
        <button
          key={grade.name}
          onClick={() => onSelect(grade.name)}
          style={{
            background: selected === grade.name ? '#3f51b5' : '#e0e0e0',
            color: selected === grade.name ? 'white' : 'black',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          מחזור {grade.name}
        </button>
      ))}
    </div>
  );
};

export default GradeSelector;
