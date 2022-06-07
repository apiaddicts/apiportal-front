/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Suscriptions from '../ProfileAdmin/containers/Suscriptions';
import Title from '../../components/Title/Title';
import classes from './ApiSubscriptions.module.scss';

function Admin() {
  const { user } = useSelector((state) => state.user);

  return (
    <Container fixed sx={{ paddingLeft: '59px !important', paddingRight: '97px !important', height: '100%' }}>
      <div className={classes.wrapper_subscriptions}>
        <div className='mb-5'>
          <Title text='Suscripciones' />
        </div>
      </div>
      <Suscriptions user={user} />
    </Container>
  );
}

export default Admin;
