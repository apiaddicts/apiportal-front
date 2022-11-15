import React from 'react';
import classes from './title.module.scss';

function Title({ text, divider = true, stylesTitle }) {
  return (
    <div>
      <h1 style={stylesTitle} className={classes.title}>
        {text}
      </h1>
    </div>
  );
}

Title.propTypes = {};

export default Title;
