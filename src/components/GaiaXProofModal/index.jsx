import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton,
  TextField, Button, Typography, Box, CircularProgress, Chip, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import config from '../../services/config';
import styles from './gaiaXProof.module.scss';

function GaiaXProofModal({ open, onClose }) {
  const { t } = useTranslation();
  const [credentialUrl, setCredentialUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setCredentialUrl('');
    setResult(null);
    setError(null);
    onClose();
  };

  const handleValidate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`${config.apiUrl}/gaia-x/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credentialUrl }),
      });
      if (!res.ok) {
        setError(t('GaiaX.genericError'));
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch {
      setError(t('GaiaX.genericError'));
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.isActive) {
      return (
        <Box className={styles.resultBox}>
          <Chip label={t('GaiaX.validCredential')} className={styles.badgeValid} />
          <Divider className={styles.divider} />
          <Typography><strong>{t('GaiaX.issuer')}:</strong> {result.issuer}</Typography>
          <Typography><strong>{t('GaiaX.issuanceDate')}:</strong> {result.issuanceDate}</Typography>
          <Typography><strong>{t('GaiaX.expirationDate')}:</strong> {result.expirationDate}</Typography>

          {result.credentialSubjects?.length > 0 && (
            <Box className={styles.section}>
              <Typography className={styles.sectionTitle}>{t('GaiaX.credentialSubjects')}</Typography>
              {result.credentialSubjects.map((subject, i) => (
                <Box key={i} className={styles.subjectBox}>
                  <Typography><strong>{t('GaiaX.subjectType')}:</strong> {subject['gx:type']}</Typography>
                  <Typography><strong>ID:</strong> {subject.id}</Typography>
                  <Typography><strong>{t('GaiaX.subjectVersion')}:</strong> {subject.version}</Typography>
                  <Typography><strong>{t('GaiaX.subjectIntegrity')}:</strong> {subject.integrity}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {result.proof && (
            <Box className={styles.section}>
              <Typography className={styles.sectionTitle}>{t('GaiaX.proof')}</Typography>
              <Typography><strong>{t('GaiaX.proofType')}:</strong> {result.proof.type}</Typography>
              <Typography><strong>{t('GaiaX.proofCreated')}:</strong> {result.proof.created}</Typography>
              <Typography><strong>{t('GaiaX.proofVerificationMethod')}:</strong> {result.proof.verificationMethod}</Typography>
              <Typography className={styles.jws}><strong>JWS:</strong> {result.proof.jws}</Typography>
            </Box>
          )}
        </Box>
      );
    }

    if (result.exists && result.isExpired) {
      return (
        <Box className={styles.resultBox}>
          <Chip label={t('GaiaX.expiredCredential')} className={styles.badgeError} />
          <Divider className={styles.divider} />
          <Typography><strong>{t('GaiaX.issuer')}:</strong> {result.issuer}</Typography>
          <Typography><strong>{t('GaiaX.issuanceDate')}:</strong> {result.issuanceDate}</Typography>
          <Typography className={styles.expiredDate}>
            <strong>{t('GaiaX.expirationDate')}:</strong> {result.expirationDate}
          </Typography>
        </Box>
      );
    }

    return (
      <Box className={styles.resultBox}>
        <Chip label={t('GaiaX.notFound')} className={styles.badgeError} />
        <Divider className={styles.divider} />
        <Typography>{result.reason}</Typography>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {t('GaiaX.modalTitle')}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#14234B' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={styles.inputRow}>
          <TextField
            fullWidth
            label={t('GaiaX.credentialUrlLabel')}
            placeholder={t('GaiaX.credentialUrlPlaceholder')}
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleValidate}
            disabled={loading || !credentialUrl.trim()}
            className={styles.validateButton}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : t('GaiaX.validate')}
          </Button>
        </Box>

        {error && (
          <Typography className={styles.errorText}>{error}</Typography>
        )}

        {renderResult()}
      </DialogContent>
    </Dialog>
  );
}

export default GaiaXProofModal;
