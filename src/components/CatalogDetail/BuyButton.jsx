import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../services/checkoutService';
import Button from '../ui/Button/Button';
import FormError from '../ui/FormError/FormError';

const ACTIVE_STATUSES = new Set(['pending', 'paid', 'consumed']);

function formatPrice(amountCents, currency) {
  if (amountCents == null || amountCents === 0) return null;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'EUR' })
    .format(amountCents / 100);
}

function isAuthenticated() {
  try {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    return !!(token?.jwt || token?.accessToken);
  } catch { return false; }
}

function ctaLabelFor(purchase, t) {
  if (purchase.status === 'paid' && !purchase.consumerUrl) return t('Checkout.setUpConnector');
  return t('Checkout.viewPurchase');
}

function BuyButton({ catalogId, priceCents, currency, disabled }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        const match = items.find((p) => ACTIVE_STATUSES.has(p.status) &&
          p.library_catalog?.documentId === catalogId);
        if (match) setExistingPurchase(match);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [catalogId]);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await checkoutService.createCheckoutSession(catalogId);
      if (!res?.checkoutUrl && !res?.purchaseId) {
        const msg = res?.error?.message || res?.message || `Checkout failed (${JSON.stringify(res).slice(0, 120)})`;
        setError(msg);
        setLoading(false);
        return;
      }
      if (res.free && res.purchaseId) {
        navigate(`/developer/purchases/${res.purchaseId}`);
        return;
      }
      window.location.href = res.checkoutUrl;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  if (existingPurchase && existingPurchase.status === 'pending') {
    return (
      <div>
        <Button onClick={handleClick} disabled={loading} fullWidth>
          {loading ? t('Checkout.processing') : t('Checkout.retry')}
        </Button>
        <FormError compact>{error}</FormError>
      </div>
    );
  }

  if (existingPurchase) {
    return (
      <Button to={`/developer/purchases/${existingPurchase.documentId}`} variant='secondary' fullWidth>
        {ctaLabelFor(existingPurchase, t)}
      </Button>
    );
  }

  const price = formatPrice(priceCents, currency);
  const buyLabel = price ? `${t('Checkout.buy')} · ${price}` : t('Checkout.get');

  return (
    <div>
      <Button onClick={handleClick} disabled={loading || checking || disabled} fullWidth>
        {loading ? t('Checkout.processing') : buyLabel}
      </Button>
      <FormError compact>{error}</FormError>
    </div>
  );
}

export default BuyButton;
