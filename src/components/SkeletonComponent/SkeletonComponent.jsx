import React from 'react';

import classes from './skeleton.module.scss';
import { ReactComponent as Loader } from '../../static/img/LoadSURA_b.svg';

function SkeletonComponent() {
  return (
    <section className={classes.banner}>

      <div className={classes.leftSide}>
        <div className={classes.displayTitle}>
          <div className={classes.wrapper__loader}>
            <Loader />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkeletonComponent;
