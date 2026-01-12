/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { getApiDetail, resetApiDetailed } from '../../../redux/actions/apiManagerAction';
import { useTranslation } from 'react-i18next';

import Title from '../../../components/Title';
import AccordionFilter from '../../../components/Accordion/AccordionFilter';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import CustomAccordion from '../../../components/common/CustomAccodion/CustomAccordion';
import Icon from '../../../components/MdIcon/Icon';
import classes from './api-detail.module.scss';

function ApiDetail(props) {
  const { t } = useTranslation();
  const { api, loading } = useSelector((state) => state.apiManager);

  const params = useParams();
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(0);
  const [subItem, setSubItem] = useState(0);

  const infoApi = [{
    title: t('apiInformation'),
    questions: [
      t('information'),
      t('description'),
    ],
  }];

  useEffect(() => {
    if (params.id && api && Object.keys(api).length === 0) {
      dispatch(getApiDetail('Mulesoft', params.id))
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
            <span>{t('back')}</span>
          </div>
        </Link>
      </div>
      <Container  >
        {api && Object.keys(api).length > 0 ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
              <Title text={api.assetId ? api.assetId : 'Demo API'} />
              <Link to={`/developer/apis/${api.assetId}/swagger-ui`} className={classes.wrapper__btn}>
                <span>{t('definition')}</span>
                <Icon id='MdChevronRight' />
              </Link>
            </Box>
            <Box className={classes.grid__apidetail}>
              <div className={classes.grid__apidetail__accordionfilter}>
                <AccordionFilter items={infoApi} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
              </div>
              <div className={classes.grid__apidetail__customaccordion}>
                <CustomAccordion items={api} subItem={subItem} setSubItem={setSubItem} />
              </div>
            </Box>
          </div>
        ) : (<SkeletonComponent />)}
      </Container>
    </>
  );
}

export default ApiDetail;

