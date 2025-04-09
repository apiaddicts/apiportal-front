/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch/* , useSelector  */ } from 'react-redux';
import { Box, Container } from '@mui/material';
import { /* getApi, */ resetApiDetailed, getMuleApi } from '../../../redux/actions/libraryAction';
import Title from '../../../components/Title';
import AccordionFilter from '../../../components/Accordion/AccordionFilter';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import CustomAccordion from '../../../components/common/CustomAccodion/CustomAccordion';
import Icon from '../../../components/MdIcon/Icon';
import classes from './api-detail.module.scss';

function ApiDetail(props) {
  // const { api } = useSelector((state) => state.library);

  const params = useParams();
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(0);
  const [subItem, setSubItem] = useState(0);
  const [apiDetail, setApiDetail] = useState({});

  const infoApi = [{
    title: 'Información API',
    questions: [
      'Información',
      'Descripción',
      'Versiones',
      'Autenticación',
    ],
  }];

  useEffect(() => {
    if (params.id) {
      // dispatch(getApi(params.id));
      getMuleApi(params.id)
        .then((response) => {
          console.log(response);
          setApiDetail(response);
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetApiDetailed());
    };
  }, []);

  return (
    <>
      <div className={classes.back__btn}>
        <Link to={-1}>
          <div className={classes.return}>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
        {apiDetail && Object.keys(apiDetail).length > 0 ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
              <Title text={apiDetail.name ? apiDetail.name : 'Demo API'} />
              <Link to={`/developer/apis/${apiDetail.name}/swagger-ui`} className={classes.wrapper__btn}>
                <span>Probar</span>
                <Icon id='MdChevronRight' />
              </Link>
            </Box>
            <Box className={classes.grid__apidetail}>
              <div className={classes.grid__apidetail__accordionfilter}>
                <AccordionFilter items={infoApi} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
                {/* <AccordionFilter items={endPoints} clicked={clicked} setClicked={setClicked} /> */}
              </div>
              <div className={classes.grid__apidetail__customaccordion}>
                <CustomAccordion items={apiDetail} subItem={subItem} setSubItem={setSubItem} />
              </div>
            </Box>
          </div>
        ) : (<SkeletonComponent />)}
      </Container>
    </>
  );
}

export default ApiDetail;

