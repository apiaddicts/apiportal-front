import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import classes from './subscription-detail.module.scss';
import './form.scss';

function SubscriptionDetail(props) {
  const { t } = useTranslation();
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '2514384',
          formId: 'a8a3ad2f-9e9e-4789-8e05-8fda23c62659',
          sfdcCampaignId: '7011v000001B55ZAAS',
          region: 'na1',
          target: '#hubspotForm',
        });
        setFormLoaded(true);
      }
    });
  }, []);

  return (
    (formLoaded) ? (
      <div className={classes.subscription_detail}>
        <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
          <h1 className='h2 text__primary__title font-weight-bold text-center'>{t('SubscriptionDetail.contactForm')}</h1>
          <div className={classes.subscription_detail__form}>
            <div id='hubspotForm' />
          </div>
        </Container>
      </div>
    ) : <SkeletonComponent />
  );
}

export default SubscriptionDetail;
