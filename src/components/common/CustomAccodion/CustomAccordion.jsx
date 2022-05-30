import React from 'react';
import Icon from '../../MdIcon/Icon';
import classes from './customaccordion.module.scss';

function CustomAccordion({ items, subItem, setSubItem }) {
  const toggleItem = (index) => {
    if (subItem === index) {
      return setSubItem(null);
    }
    return setSubItem(index);

  };

  const arrOption = [
    'Información',
    'Descripción',
    'Versiones',
    'Condiciones de uso',
    'Sandbox',
    'Autenticación',
  ];
  return (
    <div>
      { items && Object.keys(items).length > 0 ? (
        <div>
          {arrOption.map((option, index) => (
            <div className={classes.accordion}>
              <div
                className={subItem === index ? `${classes.accordion__head} ${classes.active}` : `${classes.accordion__head}`}
                onClick={() => {
                  toggleItem(index);
                }}
                role='button'
                tabIndex='0'
              >
                <div className={classes.accordion__head__title}>
                  <p>{option}</p>
                </div>
                <div className={classes.accordion__head__title__actionbutton}>
                  {subItem === index ? <Icon id='MdArrowDropUp' /> : <Icon id='MdArrowDropDown' />}
                </div>
              </div>
              {
                subItem === index ? (
                  <div className={`body-1 text__gray__gray_darken ${classes.accordion__body}`}>
                    <p className={classes.accordion__body__description}>{items.properties.description}</p>

                    <div className={classes.accordion__body__title}>
                      <h1>Titulo</h1>
                      <p>
                        {items.properties.displayName}
                      </p>
                    </div>

                    <div className={classes.accordion__body__title}>
                      <h1>Version</h1>
                      <p>
                        {items.properties.apiVersion}
                      </p>
                    </div>

                    <div className={classes.accordion__body__title}>
                      <h1>Protocols</h1>
                      <p>
                        {
                          items.properties.protocols.map((protocol, index) => {
                            return protocol;
                          })
                        }
                      </p>
                    </div>
                    <div className={classes.accordion__body__title}>
                      <h1>URI Sandbox:</h1>
                      <input type='text' value={items.properties.serviceUrl} />
                    </div>
                    <div className={classes.accordion__body__title}>
                      <h1>URI Live:</h1>
                      <input type='text' value={items.properties.serviceUrl} />
                    </div>

                  </div>
                ) : null
              }
            </div>
          ))}
        </div>
      ) : null }
    </div>
  );
}

export default CustomAccordion;
