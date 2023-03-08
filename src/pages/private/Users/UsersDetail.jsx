import { Card, Container } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../../components/MdIcon/Icon';
import Spinner from '../../../components/Spinner';
import Title from '../../../components/Title';
import usersAction from '../../../redux/actions/usersAction';
import Button from '../../../components/Buttons/Button';

function UsersDetail(props) {
  const dispatch = useDispatch();
  const { usersDetailReq } = useSelector((state) => state.users);
  const params = useParams();

  useEffect(() => {
    dispatch(usersAction.getUsersDetail(params.id));
  }, []);

  const assignGroup = useFormik({
    initialValues: {},
    validationSchema: {},
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {},
  });

  return (
    <Container fixed className='container__padding'>
      <div className='back__btn'>
        <Link to={-1}>
          <div className='return'>
            <div>
              <Icon id='MdKeyboardBackspace' />
            </div>
            <span>VOLVER</span>
          </div>
        </Link>
      </div>
      <div className='grid__container'>
        <div className='wrapper__title'>
          <Title text='Detalle de usuario' />
        </div>
      </div>
      <div>
        <Card className='card__wrapper'>
          {usersDetailReq ? (<Spinner title='Cargando...' styles={{ height: '500px' }} />) : (
            <div className='fs__36 font-weight-bold text__primary'>Datos Personales</div>
          )}
        </Card>

        <div className='fs__36 font-weight-bold text__primary'>Asignar Grupo</div>
        <Card className='card__wrapper'>
          <div>
            <form onSubmit={assignGroup.handleSubmit}>
              <div className='row align_items__center mt-4 justify_content__between'>
                <div className='flex-lg-9 flex-sm-12' />
                <div className='flex-lg-3 flex-sm-12'>
                  <Button
                    type='submit'
                    styles='secundary'
                  >
                    Añadir
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Card>

        <div className='fs__36 font-weight-bold text__primary'>Grupos Asignados</div>
        <Card className='card__wrapper'>
          Conexión
        </Card>
      </div>
    </Container>
  );
}

export default UsersDetail;
