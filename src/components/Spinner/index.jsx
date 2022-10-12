import React from 'react';

// import { CircleSpinner } from 'react-spinners-kit';
// import { ReactComponent as Loader } from '../../static/img/LoadSURA_b.svg';
import Loader from '../Loader';

import classes from './spinner.module.scss';

function Spinner({ title, styles }) {
  return (
    <div style={styles} className={classes.spin}>
      <div className={classes.spin__center}>
        <div className={classes.wrapper__loader}>
          <Loader />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
