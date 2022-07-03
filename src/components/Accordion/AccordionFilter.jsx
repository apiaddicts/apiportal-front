import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function AccordionFilter({ items, clicked, setClicked, subItem, setSubItem }) {
  const toggle = (index) => {
    setSubItem(0);
    if (clicked === index) {
      return setClicked(null);
    }
    return setClicked(index);
  };

  const toggleItem = (subindex) => {
    if (subItem === subindex) {
      return setSubItem(null);
    }
    return setSubItem(subindex);
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
                  {
                    item.questions.map((qa, subindex) => {
                      return (
                        <li className={subItem === subindex ? `${classes.filter__body__list__item} ${classes.item__active}` : `${classes.filter__body__list__item}`} onClick={() => { toggleItem(subindex, qa); }} key={subindex}>{qa}</li>
                      );
                    })
                  }
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
