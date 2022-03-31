import React from 'react';
import Base from '../Banner/Base';

function Footer({ props }) {
  const img = 'https://picsum.photos/1920/300';
  return (
    <Base img={img}>
      <h1>FOOTER</h1>
    </Base>
  );
}

Footer.propTypes = {};

export default Footer;
