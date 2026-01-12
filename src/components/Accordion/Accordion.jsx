import React from 'react';
import { useTranslation } from 'react-i18next';

import CustomMarkdown from '../CustomMarkdown';
import Icon from '../MdIcon/Icon';
import classes from './accordion.module.scss';

function Accordion({ subItem, setSubItem, items, parent, clicked, setClicked }) {
  const { t } = useTranslation();

  const toggleItem = (index) => {
    if (subItem === index && parent === clicked) {
      setClicked(null);
      return setSubItem(null);
    }
    setClicked(parent);
    return setSubItem(index);
  };

  return (
    <div>
      { items && items?.length > 0 ? (
        <div>
          {
            items.map((item, index) => {
              return (
                <div className={classes.accordion} key={`${clicked}-${index}`}>
                  <div
                    className={parent === clicked && subItem === index ? `${classes.accordion__head} ${classes.active}` : `${classes.accordion__head}`}
                    onClick={() => {
                      toggleItem(index);
                    }}
                    role='button'
                    tabIndex='0'
                  >
                    <div className={classes.accordion__head__title}>
                      <p>{item?.title}</p>
                    </div>
                    <div className={classes.accordion__head__title__actionbutton}>
                      {subItem === index ? <Icon id='MdArrowDropUp' /> : <Icon id='MdArrowDropDown' />}
                    </div>
                  </div>
                  {
                    parent === clicked && subItem === index ? (
                      <div className={`body-1 text__gray__gray_darken ${classes.accordion__body}`}>
                        {
                          item?.content ? <CustomMarkdown content={item?.content} /> : <p>{t('Accordion.missingContent')}</p>
                        }
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
