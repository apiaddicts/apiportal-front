import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../MdIcon/Icon';
import classes from './customaccordion.module.scss';
import { listApis, getApiHostnames, getApiOpenAPI } from '../../../redux/actions/libraryAction';

function CustomAccordion({ items, subItem, setSubItem }) {
  const { apis, hostnames, jsonOpenApi/* , openApiFormat */ } = useSelector((state) => state.library);
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
      dispatch(listApis());
    }
    if (hostnames && Object.keys(hostnames).length === 0) {
      dispatch(getApiHostnames(items.name));
    }
    if (jsonOpenApi && Object.keys(jsonOpenApi).length === 0) {
      dispatch(getApiOpenAPI(items.name));
    }
  }, [dispatch, apis, hostnames, jsonOpenApi]);

  // const mApis = apis && Object.keys(apis).length > 0 ? apis.value.map((f) => {
  //   return f;
  // }).filter((n) => n.properties.apiVersionSetId === items.properties.apiVersionSetId) : [];

  // const hostname = hostnames && Object.keys(hostnames).length > 0 ? hostnames.value.map((x) => {
  //   return x.properties.value;
  // }) : [];

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
                            <h1>Título</h1>
                            <p>
                              {items.name}
                            </p>
                          </div>

                          <div className={classes.accordion__body__title}>
                            <h1>Versión</h1>
                            <p>
                              {items.version}
                            </p>
                          </div>

                          {/* <div className={classes.accordion__body__title}>
                            <h1>Protocolo</h1>
                            <p>
                              {
                                items.properties.protocols.map((protocol, index) => {
                                  return protocol;
                                })
                              }
                            </p>
                          </div> */}
                          <div className={classes.accordion__body__title}>
                            {/* <h1>URI:</h1>
                            <code className={classes.scopes__code}>{`https://${hostname}/${items.properties.path}/${items.properties.apiVersion ? `${items.properties.apiVersion}/` : ''}`}</code> */}
                          </div>
                        </div>
                      ) : subItem === 1 ? (
                        <div>
                          <p className={classes.accordion__body__description}>{items.description}</p>
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
