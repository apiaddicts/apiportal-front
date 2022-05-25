/* eslint-disable no-restricted-syntax */
import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function Accordion({ subItem, setSubItem, items, arrItems, clicked, label }) {
  // const [flag, setFlag] = useState(false);
  const toggleItem = (index) => {
    if (subItem === index) {
      return setSubItem(null);
    }
    return setSubItem(index);

  };

  // const fIndex = arrItems.findIndex((obj) => {
  //   return obj.question === label;
  // });
  // if (fIndex && clicked) {
  //   console.log(arrItems, label);
  //   setFlag(false);
  // }

  // const validFaq = () => {
  //   const fIndex = arrItems.findIndex((obj) => {
  //     return obj.question === label;
  //   });
  //   if (clicked) {
  //     if (fIndex === clicked) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <div>
      { items.length > 0 ? (
        <div>
          {
            items.map((item, index) => {
              // const fIndex = arrItems.findIndex((obj) => {
              //   return obj.question === label;
              // });
              // console.log(clicked === fIndex);
              return (
                <div className={classes.accordion} key={index}>
                  <div
                    className={subItem === index ? `${classes.accordion__head} ${classes.active}` : `${classes.accordion__head}`}
                    onClick={() => {
                      toggleItem(index);
                    }}
                    role='button'
                    tabIndex='0'
                  >
                    <div className={classes.accordion__head__title}>
                      <p>{item.title}</p>
                    </div>
                    <div className={classes.accordion__head__title__actionbutton}>
                      {subItem === index ? <Icon id='MdArrowDropUp' /> : <Icon id='MdArrowDropDown' />}
                    </div>
                  </div>
                  {
                    subItem === index ? (
                      <div className={`body-1 text__gray__gray_darken ${classes.accordion__body}`}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum enim consequatur officia corrupti earum at molestiae impedit. Quis harum adipisci quas facilis perspiciatis sed amet quidem voluptates placeat enim nihil vitae, rem totam saepe omnis animi facere assumenda repellat iste repellendus porro earum deleniti? Delectus dicta quae nesciunt illo incidunt?</p>
                      </div>
                    ) : null
                  }
                </div>
              );
            })
          }
        </div>
      ) : null }
    </div>
  );
}

export default Accordion;
