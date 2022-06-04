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
                            jsonOpenApi.components && jsonOpenApi.components.securitySchemes && (
                              Object.keys(jsonOpenApi.components.securitySchemes).map((key, index) => {
                                return (
                                  <div key={index}>
                                    <div className={classes.accordion__title}>
                                      <h1>{key}</h1>
                                    </div>
                                    {jsonOpenApi.components.securitySchemes[key]?.description && (
                                      <div className={classes.accordion__body__description}>
                                        <p>{jsonOpenApi.components.securitySchemes[key].description}</p>
                                      </div>
                                    )}
                                    <div>
                                      <div className={classes.accordion__body__title}>
                                        <h1>Esquema de seguridad: </h1>
                                        {(() => {
                                          switch (jsonOpenApi.components.securitySchemes[key].type.toLowerCase()) {
                                            case 'http':
                                              return <p>HTTP</p>;
                                            case 'apikey':
                                              return <p>API Key</p>;
                                            case 'oauth2':
                                              return <p>OAuth 2.0</p>;
                                            default:
                                              return <p />;
                                          }
                                        })()}
                                      </div>
                                      {jsonOpenApi.components.securitySchemes[key].type.toLowerCase() === 'http' && jsonOpenApi.components.securitySchemes[key]?.scheme && (
                                        <div className={classes.accordion__body__title}>
                                          <h1>Autorización HTTP: </h1>
                                          <p>{jsonOpenApi.components.securitySchemes[key].scheme}</p>
                                        </div>
                                      )}
                                      {jsonOpenApi.components.securitySchemes[key].type.toLowerCase() === 'http' && jsonOpenApi.components.securitySchemes[key]?.scheme &&
                                        jsonOpenApi.components.securitySchemes[key].scheme === 'bearer' && jsonOpenApi.components.securitySchemes[key]?.bearerFormat && (
                                        <div className={classes.accordion__body__title}>
                                          <h1>Formato: </h1>
                                          <p>{jsonOpenApi.components.securitySchemes[key].bearerFormat}</p>
                                        </div>
                                      )}
                                      {jsonOpenApi.components.securitySchemes[key].type.toLowerCase() === 'apikey' && jsonOpenApi.components.securitySchemes[key]?.in && (
                                        <div className={classes.accordion__body__title}>
                                          <h1>{`Parámetro (${jsonOpenApi.components.securitySchemes[key].in}): `}</h1>
                                          <p>{jsonOpenApi.components.securitySchemes[key].name}</p>
                                        </div>
                                      )}
                                      {jsonOpenApi.components.securitySchemes[key].type.toLowerCase() === 'oauth2' && jsonOpenApi.components.securitySchemes[key]?.flows && (
                                        Object.keys(jsonOpenApi.components.securitySchemes[key].flows).map((flow, index) => {
                                          return (
                                            <div key={index}>
                                              <div className={classes.accordion__title}>
                                                <p>{`Flujo ${flow}`}</p>
                                              </div>
                                              {jsonOpenApi.components.securitySchemes[key].flows[flow]?.authorizationUrl && (
                                                <div className={classes.accordion__body__title}>
                                                  <h1>URL de Autorización: </h1>
                                                  <code className={classes.scopes__code}>{jsonOpenApi.components.securitySchemes[key].flows[flow].authorizationUrl}</code>
                                                </div>
                                              )}
                                              {jsonOpenApi.components.securitySchemes[key].flows[flow]?.tokenUrl && (
                                                <div className={classes.accordion__body__title}>
                                                  <h1>URL de Token: </h1>
                                                  <code className={classes.scopes__code}>{jsonOpenApi.components.securitySchemes[key].flows[flow].tokenUrl}</code>
                                                </div>
                                              )}
                                              {jsonOpenApi.components.securitySchemes[key].flows[flow]?.refreshUrl && (
                                                <div className={classes.accordion__body__title}>
                                                  <h1>URL de Refresco: </h1>
                                                  <code className={classes.scopes__code}>{jsonOpenApi.components.securitySchemes[key].flows[flow].refreshUrl}</code>
                                                </div>
                                              )}
                                              {jsonOpenApi.components.securitySchemes[key].flows[flow]?.scopes && (
                                                <div className={classes.accordion__body__title}>
                                                  <h1>Scopes: </h1>
                                                  <div>
                                                    <ul className={classes.scopes}>
                                                      {Object.keys(jsonOpenApi.components.securitySchemes[key].flows[flow].scopes).map((scope, index) => {
                                                        return (
                                                          <li key={index}>
                                                            <code className={classes.wrapper__auth__content__code}>{scope}</code>
                                                            <span>{jsonOpenApi.components.securitySchemes[key].flows[flow].scopes[scope]}</span>
                                                          </li>
                                                        );
                                                      })}
                                                    </ul>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })
                                      )}
                                    </div>
                                  </div>
                                );
                              })
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
