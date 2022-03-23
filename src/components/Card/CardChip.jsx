import React from 'react';
import ChipGreen from '../Chip/ChipGreen';
import Base from './Base';

function CardChip({ title }) {
  return (
    <Base>
      <div>
        <ChipGreen title={title} />
        <h1>lorems</h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nam molestiae, corporis eaque deleniti eligendi aut modi illo perspiciatis.
        Impedit suscipit totam quo ea odit officiis culpa voluptatum sed fugiat quibusdam?
      </p>
    </Base>
  );
}

export default CardChip;
