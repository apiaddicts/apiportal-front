import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import Card, { CardIcon, CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import Button from '../../../components/ui/Button/Button';

function CheckoutCancel() {
  const { t } = useTranslation();
  const { purchaseId } = useParams();
  const [releaseState, setReleaseState] = useState(purchaseId ? 'releasing' : 'idle');

  useEffect(() => {
    if (!purchaseId) return undefined;
    let cancelled = false;
    checkoutService.cancelPurchase(purchaseId)
      .then(() => { if (!cancelled) setReleaseState('released'); })
      .catch(() => { if (!cancelled) setReleaseState('idle'); });
    return () => { cancelled = true; };
  }, [purchaseId]);

  return (
    <Card>
      <CardIcon variant='error'>✕</CardIcon>
      <CardTitle>{t('Checkout.cancel.title')}</CardTitle>
      <CardBody>{t('Checkout.cancel.body')}</CardBody>
      {releaseState === 'releasing' && <CardMuted>{t('Checkout.cancel.releasing')}</CardMuted>}
      {releaseState === 'released' && <CardMuted>{t('Checkout.cancel.released')}</CardMuted>}
      {purchaseId && (
        <CardMuted>
          {`purchase: ${purchaseId}`}
        </CardMuted>
      )}
      <Button to='/developer/catalogs' variant='secondary'>
        {t('Checkout.cancel.backToCatalogs')}
      </Button>
    </Card>
  );
}

export default CheckoutCancel;
