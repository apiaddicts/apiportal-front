import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import ConsumeModal from '../../../components/Purchases/ConsumeModal';
import Card, { CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import Button from '../../../components/ui/Button/Button';
import FormError from '../../../components/ui/FormError/FormError';

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

  return (
    <Card layout="wide">
      <CardTitle>{t('Purchases.detail.title')}</CardTitle>

      {loading && <CardBody>{t('Common.loading')}</CardBody>}
      <FormError>{error}</FormError>

      {lastConsumption && (
        <CardMuted>
          {t('Purchases.detail.lastConsumption')}: {lastConsumption.state}
        </CardMuted>
      )}

      {!loading && !error && (
        <RowList>
          {assets.map((a) => (
            <Row key={a['@id']} interactive={false}>
              <RowLabel>{a['name'] || a['@id']}</RowLabel>
              <Button size="sm" onClick={() => setActiveAsset(a['@id'])}>
                {t('Consume.button')}
              </Button>
            </Row>
          ))}
        </RowList>
      )}

      {activeAsset && (
        <ConsumeModal
          purchaseId={id}
          assetId={activeAsset}
          onClose={() => setActiveAsset(null)}
          onSuccess={(r) => setLastConsumption(r)}
        />
      )}
    </Card>
  );
}

export default PurchaseDetail;
