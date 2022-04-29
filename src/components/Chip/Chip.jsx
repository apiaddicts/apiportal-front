import React from 'react';

function Chip({ title, className = 'verde' }) {
  return (
    <div className={`chip ${className} mt-2`}>
      <span>
        {title}
      </span>
    </div>
  );
}

export default Chip;
