import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card, { CardIcon, CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import Button from '../../../components/ui/Button/Button';

function CheckoutSuccess() {
  const { t } = useTranslation();
  const { purchaseId } = useParams();
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <Card>
      <CardIcon variant="success">✓</CardIcon>
      <CardTitle>{t('Checkout.success.title')}</CardTitle>
      <CardBody>{t('Checkout.success.body')}</CardBody>
      {sessionId && <CardMuted>session: {sessionId}</CardMuted>}
      <Button to={`/developer/purchases/${purchaseId}`}>
        {t('Checkout.success.goToContract')}
      </Button>
    </Card>
  );
}

export default CheckoutSuccess;
