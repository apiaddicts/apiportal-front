import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CheckoutCancel() {
  const { t } = useTranslation();
  const { purchaseId } = useParams();
  return (
    <main>
      <h1>{t('Checkout.cancel.title')}</h1>
      <p>{t('Checkout.cancel.body')}</p>
      <Link to="/catalogs">{t('Checkout.cancel.backToCatalogs')}</Link>
      <p><small>purchase: {purchaseId}</small></p>
    </main>
  );
}

export default CheckoutCancel;
