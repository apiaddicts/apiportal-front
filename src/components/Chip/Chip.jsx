import React from 'react';

function Chip({ title, className = 'verde', spanClass }) {
  console.log(spanClass);
  return (
    <div className={`chip ${className}`}>
      <span className={spanClass}>
        {title}
      </span>
    </div>
  );
}

export default Chip;
