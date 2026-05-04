import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../services/checkoutService';

function formatPrice(amountCents, currency) {
  if (amountCents == null) return null;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'EUR' })
    .format(amountCents / 100);
}

function BuyButton({ catalogId, priceCents, currency, disabled }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const { checkoutUrl } = await checkoutService.createCheckoutSession(catalogId);
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading || disabled} type="button">
        {loading ? t('Checkout.processing') : `${t('Checkout.buy')} ${formatPrice(priceCents, currency) || ''}`.trim()}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default BuyButton;
