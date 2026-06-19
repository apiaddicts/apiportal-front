import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../../services/checkoutService';
import ConsumeModal from '../../../components/Purchases/ConsumeModal';
import ConnectorSetupModal from '../../../components/Purchases/ConnectorSetupModal';
import Card, { CardTitle, CardBody, CardMuted } from '../../../components/ui/Card/Card';
import { RowList, Row, RowLabel } from '../../../components/ui/RowList/RowList';
import StatusBadge from '../../../components/ui/StatusBadge/StatusBadge';
import Button from '../../../components/ui/Button/Button';
import FormError from '../../../components/ui/FormError/FormError';
import classes from './purchase-detail.module.scss';

const PENDING_POLL_MS = 3000;
const PENDING_POLL_TIMEOUT_MS = 60000;

function formatPrice(amountCents, currency) {
  if (amountCents == null) return '';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'EUR' })
    .format(amountCents / 100);
}

function formatDateTime(iso, locale) {
  if (!iso) return '';
  return new Date(iso).toLocaleString(locale, {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}

function activeStepKey(purchase) {
  if (!purchase) return 'payment';
  if (purchase.status === 'pending' || purchase.status === 'failed') return 'payment';
  if (!purchase.consumerUrl) return 'connector';
  return 'consume';
}

function PendingPanel({ t }) {
  return (
    <div className={classes.panel}>
      <div className={classes.panelHead}>
        <span className={classes.spinner} aria-hidden="true" />
        <h3 className={classes.panelTitle}>{t('Purchases.steps.payment.titleActive')}</h3>
      </div>
      <CardMuted>{t('Purchases.detail.pendingHint')}</CardMuted>
    </div>
  );
}

function FailedPanel({ purchase, t }) {
  return (
    <div className={classes.panel}>
      <h3 className={classes.panelTitle}>{t('Purchases.steps.payment.titleFailed')}</h3>
      <CardMuted>{t('Purchases.steps.payment.failedHint')}</CardMuted>
      {purchase.error && <FormError>{purchase.error}</FormError>}
    </div>
  );
}

function ConnectorPanel({ t, onSetup }) {
  return (
    <div className={classes.panel}>
      <h3 className={classes.panelTitle}>{t('Purchases.steps.connector.titleActive')}</h3>
      <CardMuted>{t('Purchases.steps.connector.body')}</CardMuted>
      <div className={classes.cta}>
        <Button onClick={onSetup}>{t('Connector.setupCta')}</Button>
      </div>
    </div>
  );
}

function ConsumePanel({ purchase, assets, t, onConsume, onEditConnector, lastConsumption }) {
  return (
    <div className={classes.panel}>
      <h3 className={classes.panelTitle}>{t('Purchases.steps.consume.titleActive')}</h3>
      <CardMuted>{t('Purchases.steps.consume.body')}</CardMuted>

      <div className={classes.connectorRow}>
        <span className={classes.connectorLabel}>
          {t('Purchases.detail.connectorLabel')}: <code>{purchase.consumerUrl}</code>
        </span>
        <Button variant="ghost" size="sm" onClick={onEditConnector}>
          {t('Connector.editCta')}
        </Button>
      </div>

      {lastConsumption && (
        <CardMuted>
          {t('Purchases.detail.lastConsumption')}: {lastConsumption.state}
        </CardMuted>
      )}

      {assets.length === 0 && <CardMuted>{t('Purchases.steps.consume.noAssets')}</CardMuted>}

      {assets.length > 0 && (
        <RowList>
          {assets.map((a) => (
            <Row key={a['@id']} interactive={false}>
              <RowLabel>{a['name'] || a['@id']}</RowLabel>
              <Button size="sm" onClick={() => onConsume(a['@id'])}>
                {t('Consume.button')}
              </Button>
            </Row>
          ))}
        </RowList>
      )}
    </div>
  );
}

function PurchaseDetail() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAsset, setActiveAsset] = useState(null);
  const [editingConnector, setEditingConnector] = useState(false);
  const [lastConsumption, setLastConsumption] = useState(null);
  const pollStartRef = useRef(null);

  const refreshPurchase = () =>
    checkoutService.getOwnPurchase(id).then((res) => {
      const next = res?.data || null;
      setPurchase(next);
      return next;
    });

  const loadAssets = () =>
    checkoutService.getPurchaseAssets(id)
      .then((res) => setAssets(res.assets || []))
      .catch(() => {});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    refreshPurchase()
      .then((p) => {
        if (cancelled || !p) return null;
        if (p.status === 'paid' || p.status === 'consumed') return loadAssets();
        return null;
      })
      .catch((err) => { if (!cancelled) setError(err.message || 'failed'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!purchase || purchase.status !== 'pending') {
      pollStartRef.current = null;
      return undefined;
    }
    if (pollStartRef.current == null) pollStartRef.current = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - pollStartRef.current > PENDING_POLL_TIMEOUT_MS) {
        clearInterval(interval);
        return;
      }
      refreshPurchase()
        .then((next) => {
          if (next && (next.status === 'paid' || next.status === 'consumed')) loadAssets();
        })
        .catch(() => {});
    }, PENDING_POLL_MS);
    return () => clearInterval(interval);
  }, [purchase, id]);

  const active = activeStepKey(purchase);
  const connectorReady = Boolean(purchase?.consumerUrl);

  return (
    <Card layout="wide">
      <CardTitle>{t('Purchases.detail.title')}</CardTitle>

      {loading && <CardBody>{t('Common.loading')}</CardBody>}
      <FormError>{error}</FormError>

      {!loading && !error && !purchase && <CardBody>{t('Purchases.detail.notFound')}</CardBody>}

      {!loading && !error && purchase && (
        <>
          <header className={classes.header}>
            <div>
              <h2 className={classes.catalog}>{purchase.library_catalog?.title || purchase.documentId}</h2>
              {purchase.library_catalog?.description && (
                <CardMuted>{purchase.library_catalog.description}</CardMuted>
              )}
            </div>
            <StatusBadge status={purchase.status}>
              {purchase.status === 'paid' && !purchase.stripePaymentIntentId
                ? t('Purchases.status.free')
                : t(`Purchases.status.${purchase.status}`, purchase.status)}
            </StatusBadge>
          </header>

          {active === 'payment' && purchase.status === 'pending' && <PendingPanel t={t} />}
          {active === 'payment' && purchase.status === 'failed' && <FailedPanel purchase={purchase} t={t} />}
          {active === 'connector' && (
            <ConnectorPanel t={t} onSetup={() => setEditingConnector(true)} />
          )}
          {active === 'consume' && (
            <ConsumePanel
              purchase={purchase}
              assets={assets}
              t={t}
              lastConsumption={lastConsumption}
              onConsume={(aid) => setActiveAsset(aid)}
              onEditConnector={() => setEditingConnector(true)}
            />
          )}

          <details className={classes.details}>
            <summary>{t('Purchases.detail.transactionDetails')}</summary>
            <dl className={classes.metaGrid}>
              <div>
                <dt>{t('Purchases.detail.amount')}</dt>
                <dd>{formatPrice(purchase.amount, purchase.currency)}</dd>
              </div>
              <div>
                <dt>{t('Purchases.detail.createdAt')}</dt>
                <dd>{formatDateTime(purchase.createdAt, i18n.language)}</dd>
              </div>
              <div>
                <dt>{t('Purchases.detail.updatedAt')}</dt>
                <dd>{formatDateTime(purchase.updatedAt, i18n.language)}</dd>
              </div>
              {purchase.stripePaymentIntentId && (
                <div>
                  <dt>{t('Purchases.detail.paymentRef')}</dt>
                  <dd className={classes.mono}>{purchase.stripePaymentIntentId}</dd>
                </div>
              )}
              {connectorReady && (
                <div>
                  <dt>{t('Purchases.detail.connectorLabel')}</dt>
                  <dd>{purchase.consumerUrl}</dd>
                </div>
              )}
            </dl>
          </details>
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
          onSaved={() => refreshPurchase().then((p) => {
            if (p && (p.status === 'paid' || p.status === 'consumed')) loadAssets();
          })}
        />
      )}
    </Card>
  );
}

export default PurchaseDetail;
