import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Box, Typography, CircularProgress, IconButton, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Menu, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getUserCredentials, deleteCredential } from '../../../redux/actions/userCredentialAction';
import Title from '../../../components/Title';
import { useTranslation } from 'react-i18next';
import classes from './credentials.module.scss';
import CreateCredential from './CreateCredential';
import CustomIcon from '../../../components/MdIcon/CustomIcon';

const maskSecret = (value, visible = 5) =>
  value ? value.slice(0, visible) + '•'.repeat(10) : '—';

function Token() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuCred, setMenuCred] = useState(null);

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;
  const strapiUser = JSON.parse(localStorage.getItem('user') || 'null');
  const strapiUserId = strapiUser?.id;

  const { credentials, loading, error, deleteLoading } = useSelector((state) => state.userCredential);

  useEffect(() => {
    if (strapiUserId && accessToken) {
      dispatch(getUserCredentials(strapiUserId, accessToken));
    }
  }, [dispatch, strapiUserId, accessToken]);

  const handleCreate = () => setShowCreate(true);

  const handleMenuOpen = (e, cred) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
    setMenuCred(cred);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuCred(null);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(menuCred);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (!confirmDelete) return;
    dispatch(deleteCredential(confirmDelete.documentId, accessToken, () => setConfirmDelete(null)));
  };

  if (showCreate) {
    return (
      <Container fixed className={classes.container}>
        <CreateCredential onBack={() => { setShowCreate(false); dispatch(getUserCredentials(strapiUserId, accessToken)); }} />
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
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Credentials.clientId')} / ApiKey</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Token.type')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Token.products')}</Typography></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {credentials.map((cred) => {
                  const productCount = (cred.products ?? []).length;
                  return (
                  <TableRow
                    key={cred.id}
                    hover
                    className={classes.row}
                    onClick={() => navigate(`/developer/tokens/${cred.documentId}`)}
                  >
                    <TableCell>
                      <p className={classes.cell_description}>
                        {cred.apim_config?.name ?? '—'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={classes.cell_description}>
                        {cred.type === 'apiKey' ? maskSecret(cred.apiKey) : maskSecret(cred.clientId)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={classes.cell_description}>
                        {cred.type ?? '—'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className={classes.cell_description}>
                        {productCount} {t('Token.products')}{productCount === 1 ? '' : ''}
                      </p>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton size='small' onClick={(e) => handleMenuOpen(e, cred)}>
                        <MoreVertIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
          <ListItemText>{t('Token.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>{t('Token.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Token.deleteConfirm')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>{t('Token.cancel')}</Button>
          <Button
            variant='contained'
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={14} /> : null}
            onClick={handleDeleteConfirm}
          >
            {t('Token.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Token;
