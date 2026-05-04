import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';

function PurchasesList() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkoutService.getMyPurchases()
      .then((res) => setItems(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>{t('Common.loading')}</p>;
  if (!items.length) return <p>{t('Purchases.empty')}</p>;

  return (
    <main>
      <h1>{t('Purchases.title')}</h1>
      <ul>
        {items.map((p) => (
          <li key={p.documentId}>
            <Link to={`/purchases/${p.documentId}`}>
              {p.library_catalog?.title || p.bundleId} — {p.status}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default PurchasesList;
