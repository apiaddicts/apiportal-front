import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function Accordion({ title, body, active, setActive }) {
  // const [flag, setFlag] = useState(false);

  const toggleItem = () => {
    if (active.item === title) {
      return setActive({
        filter: null,
        item: null,
      });
    }
    return setActive({
      ...active,
      item: title,
    });

  };

  return (
    <div className={classes.accordion}>
      <div
        className={active.item === title ? `${classes.accordion__head} ${classes.active}` : `${classes.accordion__head}`}
        onClick={() => {
          toggleItem();
        }}
        role='button'
        tabIndex='0'
      >
        <div className={classes.accordion__head__title}>
          <p>{title}</p>
        </div>
        <div className={classes.accordion__head__title__actionbutton}>
          {active.item === title || active.item === title.subtitle ? <Icon id='MdExpandLess' /> : <Icon id='MdExpandMore' />}
        </div>
      </div>
      {
        active.item === title || active.item === title.subtitle ? (
          <div className={`body-1 text__gray__gray_darken ${classes.accordion__body}`}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum enim consequatur officia corrupti earum at molestiae impedit. Quis harum adipisci quas facilis perspiciatis sed amet quidem voluptates placeat enim nihil vitae, rem totam saepe omnis animi facere assumenda repellat iste repellendus porro earum deleniti? Delectus dicta quae nesciunt illo incidunt?</p>
          </div>
        ) : null
      }

    </div>
  );
}

export default Accordion;
