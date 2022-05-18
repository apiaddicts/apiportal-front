import React from 'react';
import classes from './title.module.scss';

function Title({ text, divider = true }) {
  return (
    <div>
      <h1 className={classes.title}>
        {text}
      </h1>
      {
        divider ? (
          <div className={classes.divider} />
        ) : (null)
      }
    </div>
  );
}

Title.propTypes = {};

export default Title;
