import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CheckoutSuccess() {
  const { t } = useTranslation();
  const { purchaseId } = useParams();
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  return (
    <main>
      <h1>{t('Checkout.success.title')}</h1>
      <p>{t('Checkout.success.body')}</p>
      <p><small>session: {sessionId}</small></p>
      <Link to={`/purchases/${purchaseId}`}>{t('Checkout.success.goToContract')}</Link>
    </main>
  );
}

export default CheckoutSuccess;
