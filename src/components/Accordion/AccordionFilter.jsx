import React, { useState } from 'react';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function AccordionFilter({ items }) {
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const toggle = (index) => {
    if (clicked === index) {

      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleItem = (subindex) => {
    if (active === subindex) {
      return setActive(null);
    }
    setActive(subindex);
  };

  return (
    <div>
      {
        items.map((item, index) => (
          <div key={index} className={classes.filter}>
            <div className={classes.filter__title} onClick={() => { toggle(index); }} key={index} role='button' tabIndex='0'>
              <div className={classes.filter__title__text}>
                <p>{item.title}</p>
              </div>
              <div className={classes.filter__title__actionbutton}>
                {clicked === index ? <Icon id='MdExpandLess' /> : <Icon id='MdExpandMore' />}
              </div>
            </div>
            {clicked === index ? (
              <div className={classes.filter__body}>
                <ul className={classes.filter__body__list}>
                  {item.questions.map((qa, subindex) => (
                    <li className={active === subindex ? `${classes.filter__body__list__item} ${classes.item__active}` : `${classes.filter__body__list__item}`} onClick={() => { toggleItem(subindex); }} key={subindex}>{qa}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))
      }
    </div>
  );
}

export default AccordionFilter;
