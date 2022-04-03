import React, { useState } from 'react';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function Accordion({ title, body }) {
  const [flag, setFlag] = useState(false);
  return (
    <div className={classes.accordion}>
      <div className={flag ? `${classes.accordion__head} ${classes.active}` : `${classes.accordion__head}`} onClick={() => { setFlag(!flag); }} role='button' tabIndex='0'>
        <div className={classes.accordion__head__title}>
          <p>{title}</p>
        </div>
        <div className={classes.accordion__head__title__actionbutton}>
          {flag ? <Icon id='MdExpandLess' /> : <Icon id='MdExpandMore' />}
        </div>
      </div>
      {
        flag && (
          <div className={`body-1 text__gray__gray_darken ${classes.accordion__body}`}>
            <p>{body}</p>
          </div>
        )
      }
    </div>
  );
}

export default Accordion;
