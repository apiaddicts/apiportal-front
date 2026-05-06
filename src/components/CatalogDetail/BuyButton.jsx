import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../services/checkoutService';
import Button from '../ui/Button/Button';
import FormError from '../ui/FormError/FormError';

function formatPrice(amountCents, currency) {
  if (amountCents == null) return null;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'EUR' })
    .format(amountCents / 100);
}

function isAuthenticated() {
  try {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    return !!(token?.jwt || token?.accessToken);
  } catch { return false; }
}

function BuyButton({ catalogId, priceCents, currency, bundleId, disabled }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingPurchase, setExistingPurchase] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!catalogId || !isAuthenticated()) return;
    setChecking(true);
    checkoutService.getMyPurchases()
      .then((res) => {
        const items = res.data || [];
        const match = items.find((p) => {
          if (p.status !== 'paid') return false;
          if (bundleId && p.bundleId === bundleId) return true;
          return p.library_catalog?.documentId === catalogId;
        });
        if (match) setExistingPurchase(match);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [catalogId, bundleId]);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await checkoutService.createCheckoutSession(catalogId);
      if (!res?.checkoutUrl) {
        const msg = res?.error?.message || res?.message || `Checkout failed (${JSON.stringify(res).slice(0, 120)})`;
        setError(msg);
        setLoading(false);
        return;
      }
      window.location.href = res.checkoutUrl;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  if (existingPurchase) {
    return (
      <Button to={`/developer/purchases/${existingPurchase.documentId}`} variant="secondary" fullWidth>
        {t('Checkout.viewPurchase')}
      </Button>
    );
  }

  const price = formatPrice(priceCents, currency);

  return (
    <div>
      <Button onClick={handleClick} disabled={loading || checking || disabled} fullWidth>
        {loading ? t('Checkout.processing') : `${t('Checkout.buy')}${price ? ` · ${price}` : ''}`}
      </Button>
      <FormError compact>{error}</FormError>
    </div>
  );
}

export default BuyButton;
