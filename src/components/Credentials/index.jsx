import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography, Card, CardContent, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, ExpandMore, ExpandLess, Add } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserCredentials } from '../../redux/actions/userCredentialAction';
import styles from './credentials.module.scss';

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
            {t('Credentials.myCredentials')}
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={onCreateNew}>
            {t('Credentials.createCredential')}
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : credentials.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            {t('Credentials.noCredentials')}
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t('Credentials.credentialId')}</TableCell>
                  <TableCell>{t('Credentials.clientId')}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {credentials.map(cred => (
                <TableRow hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {cred.slug}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {cred.clientId ?? '—'}
                  </TableCell>
                </TableRow>
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
