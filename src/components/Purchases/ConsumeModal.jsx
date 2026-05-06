import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import checkoutService from '../../services/checkoutService';
import Modal, { modalClasses } from '../ui/Modal/Modal';
import { CardTitle, CardMuted } from '../ui/Card/Card';
import Button from '../ui/Button/Button';
import FormError from '../ui/FormError/FormError';

const STATUS = {
  IDLE:     { dotClass: '',                    label: 'Webhook.idle' },
  CHECKING: { dotClass: 'dotChecking',         label: 'Webhook.checking' },
  OK:       { dotClass: 'dotOk',               label: 'Webhook.ok' },
  KO:       { dotClass: 'dotKo',               label: 'Webhook.ko' },
};

const CONSUMER_STORAGE_KEY = 'consumer_creds_last';

function ConsumeModal({ purchaseId, assetId, onClose, onSuccess }) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [check, setCheck] = useState(STATUS.IDLE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [consumerUrl, setConsumerUrl] = useState('');
  const [consumerApiKey, setConsumerApiKey] = useState('');

  useEffect(() => {
    checkoutService.getMyWebhooks().then((res) => setHistory(res.data || [])).catch(() => {});
    try {
      const saved = JSON.parse(localStorage.getItem(CONSUMER_STORAGE_KEY) || 'null');
      if (saved?.consumerUrl) setConsumerUrl(saved.consumerUrl);
      if (saved?.consumerApiKey) setConsumerApiKey(saved.consumerApiKey);
    } catch {}
  }, []);

  const runPreflight = async (target) => {
    if (!target || !/^https?:\/\//.test(target)) {
      setCheck(STATUS.IDLE);
      return;
    }
    setCheck(STATUS.CHECKING);
    try {
      const res = await checkoutService.preflightWebhook(target);
      setCheck(res.ok ? STATUS.OK : STATUS.KO);
    } catch {
      setCheck(STATUS.KO);
    }
  };

  const handleConsume = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await checkoutService.consumeAsset(
        purchaseId, assetId, url,
        { consumerUrl, consumerApiKey },
      );
      try {
        localStorage.setItem(CONSUMER_STORAGE_KEY, JSON.stringify({ consumerUrl, consumerApiKey }));
      } catch {}
      if (result?.state === 'COMPLETED') {
        toast.success(t('Consume.toastSuccess'));
      } else {
        toast.error(t('Consume.toastEndedIn', { state: result?.state || 'UNKNOWN' }));
      }
      onSuccess?.(result);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Consume failed');
    } finally {
      setSubmitting(false);
    }
  };

  const submitDisabled = submitting || check !== STATUS.OK || !consumerUrl;

  return (
    <Modal onClose={onClose} ariaLabel={t('Consume.title')}>
      <CardTitle>{t('Consume.title')}</CardTitle>
      <CardMuted>{assetId}</CardMuted>

      {history.length > 0 && (
        <div className={modalClasses.formGroup}>
          <label htmlFor="webhook-history" className={modalClasses.label}>
            {t('Consume.history')}
          </label>
          <select
            id="webhook-history"
            className={modalClasses.input}
            onChange={(e) => { setUrl(e.target.value); runPreflight(e.target.value); }}
            defaultValue=""
          >
            <option value="">—</option>
            {history.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      )}

      <div className={modalClasses.formGroup}>
        <label htmlFor="webhook-url" className={modalClasses.label}>
          {t('Consume.webhookUrl')}
        </label>
        <input
          id="webhook-url"
          type="url"
          className={modalClasses.input}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={(e) => runPreflight(e.target.value)}
          placeholder="https://..."
        />
        <span className={modalClasses.statusRow} aria-label={t(check.label)}>
          <span className={`${modalClasses.dot} ${modalClasses[check.dotClass] || ''}`.trim()} />
          {t(check.label)}
        </span>
      </div>

      <div className={modalClasses.formGroup}>
        <label htmlFor="consumer-url" className={modalClasses.label}>
          {t('Consume.consumerUrl')}
        </label>
        <input
          id="consumer-url"
          type="url"
          className={modalClasses.input}
          value={consumerUrl}
          onChange={(e) => setConsumerUrl(e.target.value)}
          placeholder="consumer-conector.example/management/v3"
        />
      </div>

      <div className={modalClasses.formGroup}>
        <label htmlFor="consumer-api-key" className={modalClasses.label}>
          {t('Consume.consumerApiKey')}
        </label>
        <input
          id="consumer-api-key"
          type="password"
          className={modalClasses.input}
          value={consumerApiKey}
          onChange={(e) => setConsumerApiKey(e.target.value)}
          placeholder={t('Consume.optional')}
        />
      </div>

      <FormError>{error}</FormError>

      <div className={modalClasses.actions}>
        <Button variant="ghost" onClick={onClose}>{t('Consume.cancel')}</Button>
        <Button onClick={handleConsume} disabled={submitDisabled}>
          {submitting ? t('Consume.calling') : t('Consume.callAsset')}
        </Button>
      </div>
    </Modal>
  );
}

export default ConsumeModal;
