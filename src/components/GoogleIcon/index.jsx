import React from 'react';

function IconM({ iconoName, iconColor }) {
  const color = (color) => ({
    color: `${color}`,
  });

  return (
    <span style={color(iconColor)} className='material-icons-round text__size-1'>
      {iconoName}
    </span>
  );
};

export default IconM;
