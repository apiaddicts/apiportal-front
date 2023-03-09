import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import productsService from '../../../services/productsService';
import classes from './subscription-detail.module.scss';
import './form.scss';

function SubscriptionDetail(props) {
  const params = useParams();
  const [subscriptionDetail, setSubscriptionDetail] = useState();
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {

    productsService.getSubscriptionById(params.id).then((subscriptionDetail) => {
      if (subscriptionDetail && subscriptionDetail?.formSetting && subscriptionDetail?.formSetting?.portalId &&
        subscriptionDetail?.formSetting?.formId && subscriptionDetail?.formSetting?.sfdcCampaignId) {
        setSubscriptionDetail(subscriptionDetail);
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);
        script.addEventListener('load', () => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              portalId: subscriptionDetail?.formSetting?.portalId,
              formId: subscriptionDetail?.formSetting?.formId,
              sfdcCampaignId: subscriptionDetail?.formSetting?.sfdcCampaignId,
              target: '#hubspotForm',
            });
            setFormLoaded(true);
          }
        });
      }
    });
  }, []);

  return (
    (subscriptionDetail && formLoaded) ? (
      <div className={classes.subscription_detail}>
        <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
          <h1 className='h2 text__primary__title font-weight-bold text-center'>{subscriptionDetail?.slug === 'partner' ? 'Conviértete en Partner' : `Suscribete a ${subscriptionDetail?.title}`}</h1>
          <div className={classes.subscription_detail__form}>
            <div id='hubspotForm' />
          </div>
        </Container>
      </div>
    ) : <SkeletonComponent />
  );
}

export default SubscriptionDetail;
