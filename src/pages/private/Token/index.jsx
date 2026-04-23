import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getUserCredentials } from '../../../redux/actions/userCredentialAction';
import Title from '../../../components/Title';
import { useTranslation } from 'react-i18next';
import classes from './credentials.module.scss';
import CreateCredential from './CreateCredential';
import CustomIcon from '../../../components/MdIcon/CustomIcon';

function Token() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;
  const strapiUser = JSON.parse(localStorage.getItem('user') || 'null');
  const strapiUserId = strapiUser?.id;

  const { credentials, loading, error } = useSelector((state) => state.userCredential);

  useEffect(() => {
    if (strapiUserId && accessToken) {
      dispatch(getUserCredentials(strapiUserId, accessToken));
    }
  }, [dispatch, strapiUserId, accessToken]);

  const handleCreate = () => setShowCreate(true);

  if (showCreate) {
    return (
      <Container fixed className={classes.container}>
        <CreateCredential onBack={() => { setShowCreate(false); dispatch(getUserCredentials()); }} />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container fixed className={classes.container}>
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && Object.keys(error).length > 0) {
    return (
      <Container fixed className={classes.container}>
        <Typography color='error'>{t('Token.errorLoading')}</Typography>
      </Container>
    );
  }

  return (
    <Container fixed className={classes.container}>

      <Box className={classes.header}>
        <Title text={t('Token.title')} />
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreate}
          className={classes.btn_create}
        >
          {t('Token.newCredential')}
        </Button>
      </Box>

      {credentials.length === 0 ? (
        <Card className={classes.card}>
          <Box className={classes.empty_state}>
            <CustomIcon name={'apitoken'} isActive={location.pathname === '/developer/tokens'} />
            <Typography variant='h6' color='text.secondary'>
              {t('Token.noCredentials')}
            </Typography>
            <Typography variant='body2' color='text.disabled'>
              {t('Token.noCredentialsDescription')}
            </Typography>
            <Button variant='outlined' startIcon={<AddIcon />} onClick={handleCreate}>
              {t('Token.createCredential')}
            </Button>
          </Box>
        </Card>
      ) : (
        <Card className={classes.card}>
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Credentials.provider')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Credentials.clientId')}</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credentials.map((cred) => {
                  return (
                    <TableRow
                      key={cred.id}
                      hover
                      className={classes.row}
                      onClick={() => navigate(`/developer/tokens/${cred.documentId}`)}
                    >
                      <TableCell>
                        <p className={classes.cell_description}>{cred.providerId}</p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {cred.clientId || '—'}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Container>
  );
}

export default Token;