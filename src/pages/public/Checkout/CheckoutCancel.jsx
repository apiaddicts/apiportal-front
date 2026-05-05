import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card, { CardIcon, CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import Button from '../../../components/ui/Button/Button';

function CheckoutCancel() {
  const { t } = useTranslation();
  const { purchaseId } = useParams();

  return (
    <Card>
      <CardIcon variant="error">✕</CardIcon>
      <CardTitle>{t('Checkout.cancel.title')}</CardTitle>
      <CardBody>{t('Checkout.cancel.body')}</CardBody>
      {purchaseId && <CardMuted>purchase: {purchaseId}</CardMuted>}
      <Button to="/catalogs" variant="secondary">
        {t('Checkout.cancel.backToCatalogs')}
      </Button>
    </Card>
  );
}

export default CheckoutCancel;
