import React from 'react';

import { CircleSpinner } from 'react-spinners-kit';

import classes from './spinner.module.scss';

function Spinner({ title, styles }) {
  return (
    <div style={styles} className={classes.spin}>
      <div className={classes.spin__center}>
        <CircleSpinner size={50} color='#0033a0' loading={true} />
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Spinner;
