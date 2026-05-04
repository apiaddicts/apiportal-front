import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import checkoutService from '../../services/checkoutService';

const STATUS = {
  IDLE: { color: '#9CA3AF', label: 'Webhook.idle' },
  CHECKING: { color: '#FACC15', label: 'Webhook.checking' },
  OK: { color: '#22C55E', label: 'Webhook.ok' },
  KO: { color: '#EF4444', label: 'Webhook.ko' },
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

  const buttonDisabled = submitting || check !== STATUS.OK;

  return (
    <div role="dialog" aria-modal="true">
      <h3>{t('Consume.title')} — {assetId}</h3>

      {history.length > 0 && (
        <div>
          <label htmlFor="webhook-history">{t('Consume.history')}</label>
          <select
            id="webhook-history"
            onChange={(e) => { setUrl(e.target.value); runPreflight(e.target.value); }}
            defaultValue=""
          >
            <option value="">—</option>
            {history.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="webhook-url">{t('Consume.webhookUrl')}</label>
        <input
          id="webhook-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={(e) => runPreflight(e.target.value)}
          placeholder="https://..."
        />
        <span
          aria-label={t(check.label)}
          title={t(check.label)}
          style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: check.color, marginLeft: 8 }}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <div>
        <button type="button" onClick={onClose}>{t('Consume.cancel')}</button>
        <button type="button" onClick={handleConsume} disabled={buttonDisabled}>
          {submitting ? t('Consume.calling') : t('Consume.callAsset')}
        </button>
      </div>
    </div>
  );
}

export default ConsumeModal;
