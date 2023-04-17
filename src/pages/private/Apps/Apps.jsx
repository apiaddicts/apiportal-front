/* eslint-disable no-mixed-operators */
import { ChevronRight } from '@mui/icons-material';
import { Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; */
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import Icon from '../../../components/MdIcon/Icon';
import Title from '../../../components/Title';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import appsActions from '../../../redux/actions/appsActions';
import { showSelectedApis } from '../../../redux/actions/libraryAction';
import Spinner from '../../../components/Spinner';
import useSearch from '../../../hooks/useSearch';
import getMessage from '../../../services/messages';

function Apps(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { apps, appsLoading, appSkip, error } = useSelector((state) => state.apps);
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState();
  const notify = (msg) => toast(msg);

  const { formik } = useSearch({
    initialState: {
      name: '',
      apis: '',
      date: '',
    },
  });

  const handlerNewApp = () => {
    dispatch(appsActions.resetApps());
    dispatch(showSelectedApis([]));
    dispatch(appsActions.setActiveStep(0));
    navigate('/developer/apps/new-app');
  };

  const handleRowClick = (objId) => {
    navigate(`/developer/apps/${objId}`);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleDialogOpen = (id) => {
    setObjectId(id);
    setOpen(true);
  };

  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      if (error.error.status === 504) {
        const msg = getMessage(error.error.status);
        notify(msg);
      }
      notify(error.error.statusText);
    }
  }, [error]);

  const handleSearch = () => {
    if (formik.values.name.trim().length > 0) {
      const trimName = formik.values.name.trim();
      dispatch(appsActions.filterByName(trimName));
    }
    if (formik.values.apis.trim().length > 0) {
      const trimApi = formik.values.apis.trim();
      dispatch(appsActions.filterByApi(trimApi));
    }
    if (formik.values.date.trim().length > 0) {
      const trimDate = formik.values.date.trim();
      dispatch(appsActions.filterByDate(trimDate));
    }
    if (formik.values.name.trim().length === 0 && formik.values.apis.trim().length === 0 && formik.values.date.trim().length === 0) {
      dispatch(appsActions.listApps());
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.apis, formik.values.date]);

  const handlePreviousApps = () => {
    dispatch(appsActions.getAppsPrevious());
  };

  const handleNextApps = () => {
    dispatch(appsActions.getAppsNext());
  };

  const handleDeleteApp = () => {
    if (objectId) dispatch(appsActions.deleteApp(objectId));
    handleDialogClose();
  };

  const arrApps = apps && Object.keys(apps).length > 0 ? apps.data.map((app) => {

    const createdDate = app.createdDateTime;
    const newCreatedDate = moment(createdDate).format('DD-MM-YYYY - hh:mm');

    return {
      applicationObjectId: app.applicationObjectId,
      displayName: app.displayName,
      createdDateTime: newCreatedDate,
      apis: app.apis,
    };
  }) : [];

  return (
    <Container fixed className='container__padding'>
      <div className='grid__container'>
        <div className='wrapper__title'>
          <Title text='Aplicaciones' />
          <Button styles='primary-blue' endIcon={<ChevronRight />} className='custom__btn custom__btn__primary wrapper__title__btn' onClick={handlerNewApp}>
            Nueva Aplicación
          </Button>
        </div>
      </div>
      {appsLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
        <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
          <Grid item sx={{ marginBottom: '31px' }} xs={12}>
            <div className='wrapper__table__wide__display'>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <>
                          <div className='custom__table__cell__title'>
                            <h2 className='text-uppercase'>Nombre</h2>
                          </div>
                          <div className='custom__table__filter'>
                            <InputResponse
                              name='name'
                              type='text'
                              label='Buscar por Nombre'
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('apis', '');
                                formik.setFieldValue('date', '');
                              }}
                              value={formik.values.name}
                            />
                          </div>
                        </>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <>
                          <div className='custom__table__cell__title'>
                            <h2 className='text-uppercase'>Apis</h2>
                          </div>
                          <div className='custom__table__filter'>
                            <InputResponse
                              name='apis'
                              type='text'
                              label='Buscar por APIs'
                              className='input__filter'
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue('name', '');
                                formik.setFieldValue('date', '');
                              }}
                              value={formik.values.apis}
                            />
                          </div>
                        </>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <>
                          <div className='custom__table__cell__title'>
                            <h2 className='text-uppercase'>Fecha de creación</h2>
                          </div>
                          <div className='custom__table__filter' />
                        </>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <>
                          <div className='custom__table__cell__title' />
                          <div className='custom__table__filter' />
                        </>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { arrApps && Object.keys(arrApps).length > 0 ? (
                      <>
                        {arrApps.map((row, i) => (
                          <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                          >
                            <TableCell component='th' scope='row' onClick={() => handleRowClick(row.applicationObjectId)}>
                              <p className='custom__table__cell__content custom__table__cell__content__link'>{row.displayName}</p>
                            </TableCell>
                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description wrapper__flex__column'>
                                {row && row.apis && row.apis.map((api, index) => (api ? (
                                  <div className='chip__wrapper' key={index}>
                                    <p>{api.displayName}</p>
                                  </div>
                                ) : null))}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className='custom__table__cell__content custom__table__cell__content__description'>{row.createdDateTime}</p>
                            </TableCell>
                            <TableCell align='center'>
                              <IconButton onClick={() => handleDialogOpen(row.applicationObjectId)}>
                                <MdDelete color='#E4002B' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align='center'>
                          <p className='custom__table__data__notfound'>Información no disponible</p>
                        </TableCell>
                      </TableRow>
                    ) }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className='wrapper__table__small__display'>
              {apps && Object.keys(apps).length > 0 ? apps.data.map((app, index) => (
                <div className='w-full py-3 border__bottom' key={index}>
                  <div
                    className='fs__12 text__secondary ls__02 cpointer'
                    onClick={() => handleRowClick()}
                    role='button'
                    tabIndex={0}
                  >
                    {app.displayName}
                  </div>
                  <div className='fs__12 text__gray__gray_darken mt-2'>
                    {app && app.apis && app.apis.map((api, index) => (api ? (
                      <div className='chip__wrapper' key={index}>
                        <p>{api.displayName}</p>
                      </div>
                    ) : null))}
                  </div>
                </div>
              )) : null}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item xs={3}>
                {appSkip > 0 ? (
                  <div onClick={() => handlePreviousApps()} className='pagination' role='button' tabIndex={0}>
                    <div className='pagination__icon'>
                      <Icon id='MdNavigateBefore' />
                    </div>
                    <p>Anterior</p>
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={1}>
                {arrApps && Object.keys(arrApps).length > 0 && apps?.paging && apps?.paging?.links?.next !== '' && apps?.paging?.links?.next !== undefined ? (
                  <div onClick={() => handleNextApps()} className='pagination' role='button' tabIndex={0}>
                    <p>Siguiente</p>
                    <div className='pagination__icon'>
                      <Icon id='MdNavigateNext' />
                    </div>
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby='confirm-delete-app'
        aria-describedby='delete-app-description'
      >
        <DialogTitle id='confirm-delete-app'>
          Desea eliminar la apliación?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-app-description'>
            Se eliminará permanentemente la aplicación. Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleDeleteApp} autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Apps;
