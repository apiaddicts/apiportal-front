import React from 'react';

import classes from './skeleton.module.scss';

function SkeletonComponent() {
  return (
    <section className={classes.banner}>
      {Array(6)
        .fill()
        .map((item, index) => (
          <div className={classes.leftSide} key={index}>
            <div className={classes.displayTitle}>
              <h1>Cargando....</h1>
            </div>
            {/* <h2 className={classes.subtitle}>
              <Skeleton width='60%' delay={2} />
              <Skeleton width='60%' delay={2} />
            </h2>
            <p className={classes.subtitle}>
              <Skeleton width='70%' delay={2} />
              <Skeleton width='70%' delay={1} />
            </p>
            <h4 className={classes.subtitle}>
              <Skeleton width='60%' delay={2} />
              <Skeleton width='60%' delay={2} />
            </h4>
            <div className={classes.displayTitle}>
              <Skeleton circle={true} height={50} width={50} delay={2} />
              {' '}
              <Skeleton circle={true} height={50} width={50} delay={2} />
              {' '}
            </div> */}
          </div>
        ))}
    </section>
  );
}

export default SkeletonComponent;
