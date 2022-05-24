import React from 'react';

function Chip({ title, className = 'verde', spanClass, styleChip }) {
  return (
    <div className={`chip ${className}`}>
      <span style={styleChip} className={spanClass}>
        {title}
      </span>
    </div>
  );
}

export default Chip;
