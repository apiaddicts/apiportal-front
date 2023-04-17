import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/MdIcon/Icon';
import Title from '../../../components/Title';
import Stepper from '../../../components/common/Stepper';

function AddApp(props) {

  const steps = ['INFORMACIÓN', 'APIS', 'CONEXIÓN'];

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: ' 0px', md: '97px !important' } }}>
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
          <Title text='Nueva Aplicación' />
        </div>
      </div>
      <Stepper steps={steps} />
    </Container>
  );
}

AddApp.propTypes = {};

export default AddApp;
