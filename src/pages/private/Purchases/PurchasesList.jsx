import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import Card, { CardTitle, CardBody } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import StatusBadge from '../../../components/ui/StatusBadge/StatusBadge';
import classes from './purchases-list.module.scss';

function formatUpdatedAt(isoString, locale) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString(locale, {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}

function PurchasesList() {
  const { t, i18n } = useTranslation();
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
          {items.map((purchase) => {
            const catalog = purchase.library_catalog;
            const title = catalog?.title || catalog?.slug || purchase.documentId;
            const description = catalog?.description || '';
            const statusLabel = t(`Purchases.status.${purchase.status}`, purchase.status);
            const updatedLabel = `${t('Purchases.list.updated')}: ${formatUpdatedAt(purchase.updatedAt, i18n.language)}`;
            return (
              <Row key={purchase.documentId} to={`/developer/purchases/${purchase.documentId}`}>
                <span className={classes.left} title={description}>
                  <RowLabel>{title}</RowLabel>
                  <span className={classes.updated}>{updatedLabel}</span>
                </span>
                <StatusBadge status={purchase.status}>{statusLabel}</StatusBadge>
              </Row>
            );
          })}
        </RowList>
      )}
    </Card>
  );
}

export default PurchasesList;
