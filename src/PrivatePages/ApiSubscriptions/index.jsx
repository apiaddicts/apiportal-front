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
    <div className={`w-full py-10 ${classes.margin_left}`}>
      <Container fixed className='my-10 py-10' maxWidth='xl'>
        <div className={classes.wrapper_subscriptions}>
          <div className='w-full my-9'>
            <Title text='Suscripciones' />
          </div>
        </div>
        <Suscriptions user={user} />
      </Container>
    </div>
  );
}

export default Admin;
