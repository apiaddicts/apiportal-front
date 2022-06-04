import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../MdIcon/Icon';
import classes from './customaccordion.module.scss';
import { listApis, getApiHostnames, getApiOpenAPI } from '../../../redux/actions/libraryAction';

function CustomAccordion({ items, subItem, setSubItem }) {
  const { apis, hostnames, jsonOpenApi } = useSelector((state) => state.library);
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
    if (jsonOpenApi && Object.keys(jsonOpenApi).length === 0) {
      dispatch(getApiOpenAPI(items.name));
    }
  }, [dispatch, apis, hostnames, jsonOpenApi]);

  const mApis = apis && Object.keys(apis).length > 0 ? apis.value.map((f) => {
    return f;
  }).filter((n) => n.properties.displayName === items.properties.displayName) : [];

  const hostname = hostnames && Object.keys(hostnames).length > 0 ? hostnames.value.map((x) => {
    return x.properties.value;
  }) : [];

  console.log(jsonOpenApi);

  return (
    <div>
      { items && Object.keys(items).length > 0 ? (
        <div>
          {arrOption.map((option, index) => (
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
                                <code className={classes.scopes__code}>{`https://${hostname}/${items.properties.path}/${pos.properties.apiVersion}/`}</code>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : subItem === 3 ? (
                        <div>
                          {
                            !jsonOpenApi.components.securitySchemes.OAuth2 && (
                              <div>
                                <div className={classes.accordion__body__title}>
                                  <h1>Esquema de seguridad</h1>
                                  <p>{!jsonOpenApi.components.securitySchemes.OAuth2?.type}</p>
                                </div>
                                <div>
                                  {!jsonOpenApi.components.securitySchemes.OAuth2?.description && (<p>{jsonOpenApi.components.securitySchemes.description}</p>)}
                                </div>
                                {!jsonOpenApi.components.securitySchemes.OAuth2?.flows && (
                                  <div>
                                    {!jsonOpenApi.components.securitySchemes.OAuth2?.flows?.authorizationCode && (
                                      <div className={classes.wrapper__auth}>
                                        <div>
                                          <p className={classes.wrapper__auth__title}>Authorization</p>
                                        </div>
                                        <div>
                                          {!jsonOpenApi.components.securitySchemes.flow?.authorizationCode.authorizationUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Authorization URL</span>
                                              <code className={classes.wrapper__auth__content__code}>Lorem ipsum dolor sit amet.</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.authorizationCode.tokenUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Token URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.authorizationCode.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.authorizationCode.refreshUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Refresh URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.authorizationCode.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.authorizationCode.scopes && (
                                            <div>
                                              <p className={classes.wrapper__auth__content__title}>Scopes</p>
                                              <ul className={classes.wrapper__auth__content__scopes}>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>read</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.authorizationCode.scopes.read}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>write</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.authorizationCode.scopes.write}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>admin</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.authorizationCode.scopes.admin}</span>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    {!jsonOpenApi.components.securitySchemes.OAuth2?.flows?.implicit && (
                                      <div className={classes.wrapper__auth}>
                                        <div>
                                          <p className={classes.wrapper__auth__title}>Implicit</p>
                                        </div>
                                        <div>
                                          {!jsonOpenApi.components.securitySchemes.flow?.implicit.authorizationUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Authorization URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.implicit.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.implicit.tokenUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Token URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.implicit.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.implicit.refreshUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Refresh URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.implicit.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.implicit.scopes && (
                                            <div>
                                              <p className={classes.wrapper__auth__content__title}>Scopes</p>
                                              <ul className={classes.wrapper__auth__content__scopes}>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>read</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.implicit.scopes.read}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>write</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.implicit.scopes.write}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>admin</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.implicit.scopes.admin}</span>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    {!jsonOpenApi.components.securitySchemes.OAuth2?.flows?.password && (
                                      <div className={classes.wrapper__auth}>
                                        <div>
                                          <p className={classes.wrapper__auth__title}>Password</p>
                                        </div>
                                        <div>
                                          {!jsonOpenApi.components.securitySchemes.flow?.password.authorizationUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Authorization URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.password.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.password.tokenUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Token URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.password.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.password.refreshUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Refresh URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.flow?.password.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.flow?.password.scopes && (
                                            <div>
                                              <p className={classes.wrapper__auth__content__title}>Scopes</p>
                                              <ul className={classes.wrapper__auth__content__scopes}>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>read</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.password.scopes.read}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>write</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.password.scopes.write}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>admin</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.flow?.password.scopes.admin}</span>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    {!jsonOpenApi.components.securitySchemes.OAuth2?.flows?.clientCredentials && (
                                      <div className={classes.wrapper__auth}>
                                        <div>
                                          <p className={classes.wrapper__auth__title}>Client Credentials</p>
                                        </div>
                                        <div>
                                          {!jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.authorizationUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Authorization URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.tokenUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Token URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.refreshUrl && (
                                            <div className={classes.wrapper__auth__content}>
                                              <span className={classes.wrapper__auth__content__title}>Refresh URL</span>
                                              <code className={classes.wrapper__auth__content__code}>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.authorizationUrl}</code>
                                            </div>
                                          )}
                                          {!jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.scopes && (
                                            <div>
                                              <p className={classes.wrapper__auth__content__title}>Scopes</p>
                                              <ul className={classes.wrapper__auth__content__scopes}>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>read</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.scopes.read}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>write</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.scopes.write}</span>
                                                </li>
                                                <li className={classes.wrapper__auth__content__scopes__item}>
                                                  <code className={classes.wrapper__auth__content__code}>admin</code>
                                                  <span>{jsonOpenApi.components.securitySchemes.OAuth2?.flow?.clientCredentials.scopes.admin}</span>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          }
                          {
                            jsonOpenApi.components.securitySchemes.apiKeyHeader && (
                              <div className={classes.wrapper__auth__apikey}>
                                <div className={classes.accordion__body__title}>
                                  <h1>Esquema de seguridad</h1>
                                  <p>{jsonOpenApi.components.securitySchemes.apiKeyHeader.type}</p>
                                </div>
                                <div className={classes.wrapper__auth}>
                                  <div>
                                    <p className={classes.wrapper__auth__title}>Header parameter</p>
                                  </div>
                                  <div>
                                    <p>{jsonOpenApi.components.securitySchemes.apiKeyHeader.name}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          {
                            jsonOpenApi.components.securitySchemes.apiKeyQuery && (
                              <div className={classes.wrapper__auth__apikey}>
                                <div className={classes.accordion__body__title}>
                                  <h1>Esquema de seguridad</h1>
                                  <p>{jsonOpenApi.components.securitySchemes.apiKeyQuery.type}</p>
                                </div>
                                <div className={classes.wrapper__auth}>
                                  <div>
                                    <p className={classes.wrapper__auth__title}>Query parameter</p>
                                  </div>
                                  <div>
                                    <p>{jsonOpenApi.components.securitySchemes.apiKeyQuery.name}</p>
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
