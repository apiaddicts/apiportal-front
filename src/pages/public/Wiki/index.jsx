import React from 'react';
import classes from './wiki.module.scss';

function Wiki(props) {
  return (
    <div className={classes.wiki}>
      <iframe
        className={classes.wiki__iframe}
        title='Wiki'
        src='./docusaurus/'
      />
    </div>
  );
}

export default Wiki;
