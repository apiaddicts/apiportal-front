import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../MdIcon/Icon';
import classes from './customaccordion.module.scss';
import { listApis, getApiHostnames } from '../../../redux/actions/libraryAction';

function CustomAccordion({ items, subItem, setSubItem }) {
  const { apis, hostnames } = useSelector((state) => state.library);
  const dispatch = useDispatch();
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
    // 'Sandbox',
  ];

  useEffect(() => {
    if (apis && Object.keys(apis).length === 0) {
      dispatch(listApis(6, 0));
    }
    if (hostnames && Object.keys(hostnames).length === 0) {
      dispatch(getApiHostnames(items.name));
    }
  }, [dispatch, apis]);

  const mApis = apis && Object.keys(apis).length > 0 ? apis.value.map((f) => {
    return f;
  }).filter((n) => n.properties.displayName === items.properties.displayName) : [];

  const hostname = hostnames && Object.keys(hostnames).length > 0 ? hostnames.value.map((x) => {
    return x.properties.value;
  }) : [];

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
                          <div className={classes.accordion__body__title}>
                            <h1>Titulo</h1>
                            <p>
                              {items.properties.displayName}
                            </p>
                          </div>

                          <div className={classes.accordion__body__title}>
                            <h1>Versión</h1>
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
                            <h1>URI Live:</h1>
                            <code className={classes.scopes__code}>{`https://${hostname}/${items.properties.path}/${items.properties.apiVersion}/`}</code>
                          </div>
                        </div>
                      ) : subItem === 1 ? (
                        <div>
                          <p className={classes.accordion__body__description}>{items.properties.description}</p>
                        </div>
                      ) : subItem === 2 ? (
                        <div>
                          <div className={classes.accordion__body__title}>
                            <h1>Titulo</h1>
                            <p>
                              {items.properties.displayName}
                            </p>
                          </div>
                          {mApis.map((pos, index) => (
                            <div key={index}>
                              <div className={classes.accordion__body__title}>
                                <h1>Versión</h1>
                                <p>
                                  {pos.properties.apiVersion}
                                </p>
                              </div>
                              <div className={classes.accordion__body__title}>
                                <h1>URI Live:</h1>
                                <code className={classes.scopes__code}>{`https://${hostname}/${items.properties.path}/${items.properties.apiVersion}/`}</code>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : subItem === 3 ? (
                        <div>
                          {
                            Object.keys(items.properties.authenticationSettings).includes('oAuth2') && (
                              <div>
                                <div className={classes.accordion__body__title}>
                                  <h1>Esquema de seguridad</h1>
                                  <p>OAuth2</p>
                                </div>
                                <div className={classes.accordion__body__title}>
                                  <h1>Implicit OAuth Flow</h1>
                                  <div>
                                    <div className={classes.accordion__body__content}>
                                      <p>URL de Autorización</p>
                                      <code className={classes.scopes__code}>{items.properties.serviceUrl}</code>
                                    </div>
                                    <div>
                                      <p>Scopes:</p>
                                      <ul className={classes.scopes}>
                                        <li>
                                          <code className={classes.scopes__code__item}>write</code>
                                          <span>- Lorem ipsum dolor sit.</span>
                                        </li>
                                        <li>
                                          <code className={classes.scopes__code__item}>read</code>
                                          <span>- Lorem ipsum dolor sit.</span>
                                        </li>
                                        <li>
                                          <code className={classes.scopes__code__item}>profile</code>
                                          <span>- Lorem ipsum dolor sit.</span>
                                        </li>
                                      </ul>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            )
                          }
                          {
                            Object.keys(items.properties.authenticationSettings).includes('openid') && (
                              <div>
                                <div className={classes.accordion__body__title}>
                                  <h1>Esquema de seguridad</h1>
                                  <p>API Key</p>
                                </div>
                                <div className={classes.accordion__body__title}>
                                  <h1>Parametros</h1>
                                  <div>
                                    <div>
                                      <p>API Key Auth:</p>
                                      <ul className={classes.scopes}>
                                        <li>
                                          <code className={classes.scopes__code__item}>type</code>
                                          <span> apiKey</span>
                                        </li>
                                        <li>
                                          <code className={classes.scopes__code__item}>in</code>
                                          <span> header</span>
                                        </li>
                                        <li>
                                          <code className={classes.scopes__code__item}>header</code>
                                          <span> X-API-KEY</span>
                                        </li>
                                      </ul>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            )
                          }
                        </div>
                      ) : (
                        <div>
                          <p>Información no disponible</p>
                        </div>
                      )
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
