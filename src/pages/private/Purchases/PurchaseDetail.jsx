import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import ConsumeModal from '../../../components/Purchases/ConsumeModal';
import ConnectorSetupModal from '../../../components/Purchases/ConnectorSetupModal';
import Card, { CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import Button from '../../../components/ui/Button/Button';
import FormError from '../../../components/ui/FormError/FormError';

function PurchaseDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAsset, setActiveAsset] = useState(null);
  const [editingConnector, setEditingConnector] = useState(false);
  const [lastConsumption, setLastConsumption] = useState(null);

  const refreshPurchase = () =>
    checkoutService.getMyPurchases().then((res) => {
      const found = (res.data || []).find((p) => p.documentId === id);
      setPurchase(found || null);
    });

  useEffect(() => {
    Promise.all([
      checkoutService.getPurchaseAssets(id).then((res) => setAssets(res.assets || [])),
      refreshPurchase(),
    ])
      .catch((err) => setError(err.message || 'failed'))
      .finally(() => setLoading(false));
  }, [id]);

  const connectorReady = Boolean(purchase?.consumerUrl);

  const handleConnectorSaved = () => {
    refreshPurchase();
  };

  return (
    <Card layout="wide">
      <CardTitle>{t('Purchases.detail.title')}</CardTitle>

      {loading && <CardBody>{t('Common.loading')}</CardBody>}
      <FormError>{error}</FormError>

      {!loading && !error && purchase && (
        <>
          <CardMuted>
            {purchase.library_catalog?.title} · {t('Purchases.detail.connectorLabel')}:{' '}
            {connectorReady ? purchase.consumerUrl : t('Purchases.detail.connectorMissing')}
          </CardMuted>

          {!connectorReady && (
            <div style={{ margin: '12px 0' }}>
              <Button onClick={() => setEditingConnector(true)}>
                {t('Connector.setupCta')}
              </Button>
            </div>
          )}

          {connectorReady && (
            <div style={{ margin: '12px 0' }}>
              <Button variant="ghost" size="sm" onClick={() => setEditingConnector(true)}>
                {t('Connector.editCta')}
              </Button>
            </div>
          )}

          {lastConsumption && (
            <CardMuted>
              {t('Purchases.detail.lastConsumption')}: {lastConsumption.state}
            </CardMuted>
          )}

          <RowList>
            {assets.map((a) => (
              <Row key={a['@id']} interactive={false}>
                <RowLabel>{a['name'] || a['@id']}</RowLabel>
                <Button size="sm" onClick={() => setActiveAsset(a['@id'])} disabled={!connectorReady}>
                  {t('Consume.button')}
                </Button>
              </Row>
            ))}
          </RowList>
        </>
      )}

      {activeAsset && connectorReady && (
        <ConsumeModal
          purchaseId={id}
          assetId={activeAsset}
          onClose={() => setActiveAsset(null)}
          onSuccess={(r) => setLastConsumption(r)}
        />
      )}

      {editingConnector && (
        <ConnectorSetupModal
          purchaseId={id}
          onClose={() => setEditingConnector(false)}
          onSaved={handleConnectorSaved}
        />
      )}
    </Card>
  );
}

export default PurchaseDetail;
