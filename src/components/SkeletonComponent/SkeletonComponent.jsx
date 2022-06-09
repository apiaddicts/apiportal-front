import React from 'react';

import { CircleSpinner } from 'react-spinners-kit';
import classes from './skeleton.module.scss';

function SkeletonComponent() {
  return (
    <section className={classes.banner}>

      <div className={classes.leftSide}>
        <div className={classes.displayTitle}>
          <CircleSpinner size={50} color='#0033a0' loading={true} />
          <h1>Cargando....</h1>
        </div>
      </div>
    </section>
  );
}

export default SkeletonComponent;
