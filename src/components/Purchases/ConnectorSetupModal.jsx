import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import checkoutService from '../../services/checkoutService';
import Modal, { modalClasses } from '../ui/Modal/Modal';
import { CardTitle, CardMuted } from '../ui/Card/Card';
import Button from '../ui/Button/Button';
import FormError from '../ui/FormError/FormError';

function ConnectorSetupModal({ purchaseId, onClose, onSaved }) {
  const { t } = useTranslation();
  const [consumerUrl, setConsumerUrl] = useState('');
  const [consumerApiKey, setConsumerApiKey] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const result = await checkoutService.setPurchaseConnector(purchaseId, consumerUrl, consumerApiKey);
      toast.success(t('Connector.toastSaved'));
      onSaved?.(result);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const submitDisabled = submitting || !consumerUrl;

  return (
    <Modal onClose={onClose} ariaLabel={t('Connector.title')}>
      <CardTitle>{t('Connector.title')}</CardTitle>
      <CardMuted>{t('Connector.subtitle')}</CardMuted>

      <div className={modalClasses.formGroup}>
        <label htmlFor="consumer-url" className={modalClasses.label}>
          {t('Connector.url')}
        </label>
        <input
          id="consumer-url"
          type="url"
          className={modalClasses.input}
          value={consumerUrl}
          onChange={(e) => setConsumerUrl(e.target.value)}
          placeholder="https://my-consumer.example/management/v3"
        />
      </div>

      <div className={modalClasses.formGroup}>
        <label htmlFor="consumer-api-key" className={modalClasses.label}>
          {t('Connector.apiKey')}
        </label>
        <input
          id="consumer-api-key"
          type="password"
          className={modalClasses.input}
          value={consumerApiKey}
          onChange={(e) => setConsumerApiKey(e.target.value)}
          placeholder={t('Connector.apiKeyOptional')}
        />
      </div>

      <FormError>{error}</FormError>

      <div className={modalClasses.actions}>
        <Button variant="ghost" onClick={onClose}>{t('Connector.cancel')}</Button>
        <Button onClick={handleSave} disabled={submitDisabled}>
          {submitting ? t('Connector.saving') : t('Connector.save')}
        </Button>
      </div>
    </Modal>
  );
}

export default ConnectorSetupModal;
