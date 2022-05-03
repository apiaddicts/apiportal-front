import React from 'react';
import classes from './title.module.scss';

function Title({ text }) {
  return (
    <div>
      <h1 className={classes.title}>
        {text}
      </h1>
      <div className={classes.divider} />
    </div>
  );
}

Title.propTypes = {};

export default Title;
