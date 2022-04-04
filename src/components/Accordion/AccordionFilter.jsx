import React from 'react';
import classes from './accordion.module.scss';

function AccordionFilter(items) {
  console.log(items);
  const { title, questions } = items;
  return (
    <div>
      <div className={classes.filter__title}>
        {title}
      </div>
      <div className={classes.filter__body}>
        {questions}
      </div>
    </div>
  );
}

export default AccordionFilter;
