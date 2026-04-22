import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from '@mui/material';
import { Visibility, VisibilityOff, ExpandMore, ExpandLess, Add } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserCredentials } from '../../redux/actions/userCredentialAction';
import styles from './ApiKeys.module.scss';

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replaceAll('-', '+').replaceAll('_', '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function maskValue(value, show) {
  if (!value) return '';
  return show ? value : '•'.repeat(Math.min(value.length, 16));
}

function SecretField({ label, value = '' }) {
  const [show, setShow] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).catch(err => console.error(err));
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      variant="outlined"
      value={maskValue(value, show)}
      sx={{ mb: 1 }}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShow(v => !v)} edge="end">
                {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={handleCopy} edge="end">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

SecretField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

function CredentialRow({ credential }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {credential.slug}
        </TableCell>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {credential.clientId ?? '—'}
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => setExpanded(v => !v)}>
            {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} sx={{ py: 0 }}>
          <Collapse in={expanded} unmountOnExit>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 1 }}>
              <SecretField label={t('ApiKeys.clientId')} value={credential.clientId ?? ''} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

CredentialRow.propTypes = {
  credential: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string.isRequired,
    clientId: PropTypes.string,
  }).isRequired,
};

function CredentialViewer({ onCreateNew }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;
  const strapiUser = JSON.parse(localStorage.getItem('user') || 'null');
  const strapiUserId = strapiUser?.id;

  const credentials = useSelector(state => state.userCredential.credentials);
  const loading = useSelector(state => state.userCredential.loading);

  useEffect(() => {
    if (strapiUserId && accessToken) {
      dispatch(getUserCredentials(strapiUserId, accessToken));
    }
  }, [dispatch, strapiUserId, accessToken]);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" className={styles.title}>
            {t('ApiKeys.myCredentials')}
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={onCreateNew}>
            {t('ApiKeys.createCredential')}
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : credentials.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            {t('ApiKeys.noCredentials')}
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('ApiKeys.credentialId')}</TableCell>
                  <TableCell>{t('ApiKeys.clientId')}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {credentials.map(cred => (
                  <CredentialRow key={cred.id ?? cred.slug} credential={cred} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}

CredentialViewer.propTypes = {
  onCreateNew: PropTypes.func.isRequired,
};

export default CredentialViewer;
