import React, { useEffect, useMemo, useState } from 'react';
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

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH']);
const PATH_PARAM_RE = /\{([^}]+)\}/g;

function extractPathParams(path) {
  if (!path) return [];
  const out = [];
  let m;
  while ((m = PATH_PARAM_RE.exec(path)) !== null) {
    out.push(m[1]);
  }
  return out;
}

function resolvePathSegments(pathTemplate, paramValues) {
  if (!pathTemplate) return '';
  return pathTemplate.replace(PATH_PARAM_RE, (_, key) => {
    const v = paramValues[key];
    return v != null ? encodeURIComponent(String(v)) : `{${key}}`;
  }).replace(/^\/+/, '');
}

function ConsumeModal({ purchaseId, asset, onClose, onSuccess }) {
  const { t } = useTranslation();
  const assetId = asset && (asset['@id'] || asset.id);
  const httpMethod = (asset?.httpMethod || asset?.properties?.httpMethod || 'GET').toUpperCase();
  const pathTemplate = asset?.path || asset?.properties?.path || '';
  const pathParams = useMemo(() => extractPathParams(pathTemplate), [pathTemplate]);
  const needsBody = BODY_METHODS.has(httpMethod);

  const [url, setUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [check, setCheck] = useState(STATUS.IDLE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paramValues, setParamValues] = useState({});
  const [bodyText, setBodyText] = useState('');
  const [bodyError, setBodyError] = useState(null);

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

  const validateBody = (text) => {
    if (!text || !text.trim()) {
      setBodyError(null);
      return true;
    }
    try {
      JSON.parse(text);
      setBodyError(null);
      return true;
    } catch (e) {
      setBodyError(e.message);
      return false;
    }
  };

  const missingPathParams = pathParams.filter((k) => !paramValues[k] || !String(paramValues[k]).trim());

  const handleConsume = async () => {
    if (needsBody && !validateBody(bodyText)) return;
    if (missingPathParams.length > 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const sourceHints = {};
      if (pathParams.length > 0) {
        sourceHints.pathSegments = resolvePathSegments(pathTemplate, paramValues);
      }
      if (needsBody && bodyText.trim()) {
        sourceHints.body = bodyText;
        sourceHints.contentType = 'application/json';
      }
      const result = await checkoutService.consumeAsset(purchaseId, assetId, url, sourceHints);
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

  const submitDisabled = submitting || check !== STATUS.OK || missingPathParams.length > 0 || !!bodyError;

  return (
    <Modal onClose={onClose} ariaLabel={t('Consume.title')}>
      <CardTitle>{t('Consume.title')}</CardTitle>
      <CardMuted>{httpMethod} {pathTemplate || assetId}</CardMuted>

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

      {pathParams.map((key) => (
        <div className={modalClasses.formGroup} key={key}>
          <label htmlFor={`pp-${key}`} className={modalClasses.label}>
            {`Path param: {${key}}`}
          </label>
          <input
            id={`pp-${key}`}
            type="text"
            className={modalClasses.input}
            value={paramValues[key] || ''}
            onChange={(e) => setParamValues({ ...paramValues, [key]: e.target.value })}
            placeholder={key}
          />
        </div>
      ))}

      {needsBody && (
        <div className={modalClasses.formGroup}>
          <label htmlFor="request-body" className={modalClasses.label}>
            {`Request body (${httpMethod} — JSON)`}
          </label>
          <textarea
            id="request-body"
            className={modalClasses.input}
            rows={5}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            onBlur={(e) => validateBody(e.target.value)}
            placeholder='{"name":"...","price":...}'
          />
          {bodyError && <FormError>{`Invalid JSON: ${bodyError}`}</FormError>}
        </div>
      )}

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
