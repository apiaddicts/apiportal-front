import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

function ConsumeModal({ purchaseId, assetId, onClose, onSuccess }) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [check, setCheck] = useState(STATUS.IDLE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkoutService.getMyWebhooks().then((res) => setHistory(res.data || [])).catch(() => {});
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
      const result = await checkoutService.consumeAsset(purchaseId, assetId, url);
      onSuccess?.(result);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Consume failed');
    } finally {
      setSubmitting(false);
    }
  };

  const submitDisabled = submitting || check !== STATUS.OK;

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
