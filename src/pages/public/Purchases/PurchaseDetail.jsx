import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import ConsumeModal from '../../../components/Purchases/ConsumeModal';

function PurchaseDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAsset, setActiveAsset] = useState(null);
  const [lastConsumption, setLastConsumption] = useState(null);

  useEffect(() => {
    checkoutService.getPurchaseAssets(id)
      .then((res) => setAssets(res.assets || []))
      .catch((err) => setError(err.message || 'failed'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>{t('Common.loading')}</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <main>
      <h1>{t('Purchases.detail.title')}</h1>
      {lastConsumption && (
        <p>{t('Purchases.detail.lastConsumption')}: {lastConsumption.state}</p>
      )}
      <ul>
        {assets.map((a) => (
          <li key={a['@id']}>
            <strong>{a['name'] || a['@id']}</strong>
            <button type="button" onClick={() => setActiveAsset(a['@id'])}>{t('Consume.button')}</button>
          </li>
        ))}
      </ul>
      {activeAsset && (
        <ConsumeModal
          purchaseId={id}
          assetId={activeAsset}
          onClose={() => setActiveAsset(null)}
          onSuccess={(r) => setLastConsumption(r)}
        />
      )}
    </main>
  );
}

export default PurchaseDetail;
