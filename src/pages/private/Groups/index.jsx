import { Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { MdDelete } from 'react-icons/md';
import Title from '../../../components/Title';
import Spinner from '../../../components/Spinner';
import groupAction from '../../../redux/actions/groupAction';
import Icon from '../../../components/MdIcon/Icon';
import InputResponse from '../../../components/Input/InputUI/InputResponse';
import classes from './GroupDetailed.module.scss';
import useSearch from '../../../hooks/useSearch';

function index(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groups, groupLoading, groupSkip } = useSelector((state) => state.group);

  const handleRowClick = (id) => {
    navigate(`/developer/groups/${id}`);
  };

  const toggleView = () => {
    navigate('/developer/groups/newGroup');
  };

  const handleDeleteGroup = (id) => {
    dispatch(groupAction.deleteGroup(id));
  };

  const { formik } = useSearch({
    initialState: {
      name: '',
      description: '',
    },
  });

  const handlePreviousGroups = () => {
    let filter = '';
    if (formik.values.name.trim().length >= 1) {
      filter = `(contains(properties/displayName,'${formik.values.name.trim()}'))`;
    } else if (formik.values.description.trim().length >= 1) {
      filter = `(contains(properties/description,'${formik.values.description.trim()}'))`;
    }
    dispatch(groupAction.getGroupPrevious(filter));
  };

  const handleNextGroups = () => {
    let filter = '';
    if (formik.values.name.trim().length >= 1) {
      filter = `(contains(properties/displayName,'${formik.values.name.trim()}'))`;
    } else if (formik.values.description.trim().length >= 1) {
      filter = `(contains(properties/description,'${formik.values.description.trim()}'))`;
    }
    dispatch(groupAction.getGroupNext(filter));
  };

  const handleSearch = () => {
    if (formik.values.name.trim().length >= 1) {
      dispatch(groupAction.filterGroupsByName(formik.values.name.trim()));
    }

    if (formik.values.description.trim().length >= 1) {
      dispatch(groupAction.filterGroupsByDescription(formik.values.description.trim()));
    }

    if (formik.values.name.trim().length === 0 && formik.values.description.trim().length === 0) {
      dispatch(groupAction.listGroups());
      dispatch(groupAction.resetGroup());
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 500);
    return () => clearTimeout(timer);
  }, [formik.values.name, formik.values.description]);

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))', alignItems: 'center' }}>
        <div className={classes.wrapper__title}>
          <Title text='Grupos' />
          <Button endIcon={<ChevronRight />} className={`custom__btn custom__btn__primary ${classes.wrapper__title__btn}`} onClick={toggleView}>
            Nuevo Grupo
          </Button>
        </div>
      </div>
      { groupLoading ? (<Spinner styles={{ height: '500px' }} title='Cargando...' />) : (
        <div>
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
                            <div style={{ height: '36px', marginTop: '14px' }}>
                              <InputResponse
                                name='name'
                                type='text'
                                label='Buscar Nombre'
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  formik.setFieldValue('description', '');
                                }}
                                value={formik.values.name}
                              />
                            </div>
                          </>
                        </TableCell>
                        <TableCell style={{ width: '100px' }} size='small'>
                          <>
                            <div className='custom__table__cell__title'>
                              <h2 className='text-uppercase'>Descripción</h2>
                            </div>
                            <div style={{ height: '36px', marginTop: '14px' }}>
                              <InputResponse
                                name='description'
                                type='text'
                                label='Buscar Descripción'
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  formik.setFieldValue('name', '');
                                }}
                                value={formik.values.description}
                              />

                            </div>
                          </>
                        </TableCell>
                        <TableCell style={{ width: '100px' }} size='small'>
                          <>
                            <div className='custom__table__cell__title' />
                            <div style={{ height: '36px', marginTop: '14px' }} />
                          </>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groups && Object.keys(groups).length > 0 ? groups.value.map((group, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                        >
                          <TableCell component='th' scope='row' onClick={() => handleRowClick(group.name)}>
                            <p className='custom__table__cell__content custom__table__cell__content__link'>{group.properties.displayName}</p>
                          </TableCell>
                          <TableCell>
                            <p className='custom__table__cell__content custom__table__cell__content__description'>{group.properties.description}</p>
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton onClick={() => handleDeleteGroup(group.name)}>
                              <MdDelete color='#E4002B' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={2} align='center'>
                            <p className='custom__table__data__notfound'>Información no disponible</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className='wrapper__table__small__display'>
                {groups && Object.keys(groups).length > 0 ? groups.value.map((group, index) => (
                  <div className='w-full py-3 border__bottom' key={index}>
                    <div
                      className='fs__12 text__secondary ls__02 cpointer'
                      onClick={() => handleRowClick()}
                      role='button'
                      tabIndex={0}
                    >
                      {group.properties.displayName}
                    </div>
                    <div className='fs__12 text__gray__gray_darken mt-2'>{group.properties.description}</div>
                  </div>
                )) : null}
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction='row' justifyContent='space-between'>
                <Grid item xs={3}>
                  {groupSkip > 0 ? (
                    <div onClick={() => handlePreviousGroups()} className='pagination' role='button' tabIndex={0}>
                      <div className='pagination__icon'>
                        <Icon id='MdNavigateBefore' />
                      </div>
                      <p>Anterior</p>
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={1}>
                  {groups.nextLink !== undefined ? (
                    <div onClick={() => handleNextGroups()} className='pagination' role='button' tabIndex={0}>
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
        </div>
      )}
    </Container>
  );
}

export default index;
