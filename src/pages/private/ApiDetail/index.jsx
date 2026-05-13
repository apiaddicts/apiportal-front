/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Title from '../../../components/Title';
import AccordionFilter from '../../../components/Accordion/AccordionFilter';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import CustomAccordion from '../../../components/common/CustomAccodion/CustomAccordion';
import Icon from '../../../components/MdIcon/Icon';
import classes from './api-detail.module.scss';
import { getLibraryBySlug } from '../../../redux/actions/libraryAction';

function ApiDetail(props) {
  const { t } = useTranslation();
  const { library, libraries } = useSelector((state) => state.library);

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
    if (params?.slug) {
      dispatch(getLibraryBySlug(params?.slug));
    }
  }, [params?.slug]);

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
      <Container sx={{ pt: 0, pb: '40px', pl: '40px', pr: '40px' }}>
        {library && Object.keys(library).length > 0 ? (
          <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={classes.box__title}>
              <Title text={library.slug ? library.slug : 'Demo API'} />
              <Link to={`/developer/apis/${library.slug}/swagger-ui`} className={classes.wrapper__btn}>
                <span>{t('definition')}</span>
                <Icon id='MdChevronRight' />
              </Link>
            </Box>
            <Box className={classes.grid__apidetail}>
              <div className={classes.grid__apidetail__accordionfilter}>
                <AccordionFilter items={infoApi} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
              </div>
              <div className={classes.grid__apidetail__customaccordion}>
                <CustomAccordion items={library} subItem={subItem} setSubItem={setSubItem} />
              </div>
            </Box>
          </div>
        ) : (<SkeletonComponent />)}
      </Container>
    </>
  );
}

export default ApiDetail;

