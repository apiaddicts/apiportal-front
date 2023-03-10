import { ChevronRight } from '@mui/icons-material';
import { MdDelete } from 'react-icons/md';
import { Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/Title';
import groupAction from '../../../redux/actions/groupAction';
import Spinner from '../../../components/Spinner';

function index(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listGroupsReq, listGroupsRes } = useSelector((state) => state.groups);

  const handleRowClick = (groupId) => {
    navigate(`/developer/groups/${groupId}`);
  };

  const handleDeleteGroup = (id) => {
    dispatch(groupAction.deleteGroup(id));
  };

  useEffect(() => {
    dispatch(groupAction.listGroups());
  }, []);

  return (
    <Container fixed className='container__padding'>
      <div className='grid__container'>
        <div>
          <Title text='Grupos' />
        </div>
        <Button endIcon={<ChevronRight />} className='custom__btn custom__btn__primary justify__self__end'>
          Nuevo Grupo
        </Button>
      </div>
      {listGroupsReq ? (<Spinner title='Cargando...' styles={{ height: '500px' }} />) : (
        <Card className='card__wrapper'>
          <Grid item sx={{ marginBottom: '31px' }} xs={12}>
            <div className='wrapper__table__wide__display'>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title'>
                          <h2 className='text-uppercase'>Nombre</h2>
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title'>
                          <h2 className='text-uppercase'>Descripción</h2>
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '100px' }} size='small'>
                        <div className='custom__table__cell__title' />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listGroupsRes && Object.keys(listGroupsRes).length > 0 ? listGroupsRes.value.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', zIndex: 6 }}
                      >
                        <TableCell component='th' scope='row' onClick={() => handleRowClick(row.name)}>
                          <p className='custom__table__cell__content custom__table__cell__content__link'>{row.properties.displayName}</p>
                        </TableCell>
                        <TableCell>
                          <p className='custom__table__cell__content custom__table__cell__content__description'>{row.properties.description}</p>
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={() => handleDeleteGroup(row.name)}>
                            <MdDelete color='#E4002B' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={3}>Información no disponible</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Card>
      )}
    </Container>
  );
}

index.propTypes = {};

export default index;
