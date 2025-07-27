import React from 'react';

const ClassList = ({ classes, onSelect }) => {
  return (
    <div>
      <h3>כיתות</h3>
      <ul>
        {classes.map(c => (
          <li key={c.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(c)}>
            כיתה {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
