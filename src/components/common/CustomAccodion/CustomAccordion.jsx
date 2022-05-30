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
    'Autenticación',
    'Sandbox',
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
                    {
                      subItem === 0 ? (
                        <div>
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
                      ) : subItem === 1 ? (
                        <div>
                          <p className={classes.accordion__body__description}>{items.properties.description}</p>
                        </div>
                      ) : subItem === 2 ? (
                        <div>
                          <h1>Versiones</h1>
                        </div>
                      ) : subItem === 3 ? (
                        <div>
                          {
                            Object.keys(items.properties.authenticationSettings).includes('oAuth2') && (
                              <div>
                                <h1 className={classes.auth__title}>OAuth2</h1>
                                <p className={classes.auth__subtitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, cum?</p>
                                <table className={classes.table__auth}>
                                  <tr className={classes.table__auth__row}>
                                    <th>Tipo de esquema de seguridad</th>
                                    <td>OAuth2</td>
                                  </tr>
                                  <tr className={classes.table__auth__subrow}>
                                    <th>Flujo OAuth2</th>
                                    <td>
                                      <div>
                                        <div>
                                          <span className={classes.auth__body}>URL de Autorización:</span>
                                          <span>{items.properties.serviceUrl}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <span className={classes.auth__body}>Scopes:</span>
                                        <ul className={classes.scopes}>
                                          <li>
                                            <code className={classes.scopes__code}>write</code>
                                            <span>- Lorem ipsum dolor sit.</span>
                                          </li>
                                          <li>
                                            <code className={classes.scopes__code}>read</code>
                                            <span>- Lorem ipsum dolor sit.</span>
                                          </li>
                                          <li>
                                            <code className={classes.scopes__code}>profile</code>
                                            <span>- Lorem ipsum dolor sit.</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            )
                          }
                          {
                            Object.keys(items.properties.authenticationSettings).includes('openid') && (
                              <div>
                                <h1 className={classes.auth__title}>API Key</h1>
                                <p className={classes.auth__subtitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, cum?</p>
                                <table className={classes.table__auth}>
                                  <tr className={classes.table__auth__row}>
                                    <th>Tipo de esquema de seguridad</th>
                                    <td>API Key</td>
                                  </tr>
                                  <tr className={classes.table__auth__subrow}>
                                    <th>Parametros</th>
                                    <td>
                                      <div>
                                        <div>
                                          <span className={classes.auth__body}>API Key Auth</span>
                                        </div>
                                      </div>
                                      <div>
                                        <ul className={classes.scopes}>
                                          <li>
                                            <code className={classes.scopes__code}>type</code>
                                            <span>apiKey</span>
                                          </li>
                                          <li>
                                            <code className={classes.scopes__code}>in</code>
                                            <span>header</span>
                                          </li>
                                          <li>
                                            <code className={classes.scopes__code}>name</code>
                                            <span>X-API-KEY</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            )
                          }
                        </div>
                      ) : null
                    }
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
