import React from 'react';

function Chip({ title, className = 'verde' }) {
  return (
    <div className={`chip ${className}`}>
      <span>
        {title}
      </span>
    </div>
  );
}

export default Chip;
