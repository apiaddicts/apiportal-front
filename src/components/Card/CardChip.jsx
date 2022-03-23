import React from 'react';
import ChipGreen from '../Chip/ChipGreen';
import Base from './Base';

function CardChip({ title }) {
  return (
    <Base>
      <ChipGreen title={title} />
    </Base>
  );
}

export default CardChip;
