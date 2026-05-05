import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import Card, { CardTitle, CardBody } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import StatusBadge from '../../../components/ui/StatusBadge/StatusBadge';

function PurchasesList() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkoutService.getMyPurchases()
      .then((res) => setItems(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card layout="wide">
      <CardTitle>{t('Purchases.list.title')}</CardTitle>
      {loading && <CardBody>{t('Common.loading')}</CardBody>}
      {!loading && items.length === 0 && <CardBody>{t('Purchases.list.empty')}</CardBody>}
      {!loading && items.length > 0 && (
        <RowList>
          {items.map((p) => (
            <Row key={p.documentId} to={`/purchases/${p.documentId}`}>
              <RowLabel>{p.library_catalog?.title || p.bundleId}</RowLabel>
              <StatusBadge status={p.status} />
            </Row>
          ))}
        </RowList>
      )}
    </Card>
  );
}

export default PurchasesList;
