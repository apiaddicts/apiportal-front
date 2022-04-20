import React from 'react';

function Base({ children, maxWidth }) {
  const cardStyle = (width) => ({
    maxWidth: `${width}px`,
  });
  return <div className='card' style={cardStyle(maxWidth)}>{children}</div>;
}

export default Base;
