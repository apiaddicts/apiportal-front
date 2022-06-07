/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { listUserSubscriptions } from '../../redux/actions/subscriptionsAction';
import Suscriptions from '../../components/Suscriptions';
import Title from '../../components/Title/Title';
import classes from './ApiSubscriptions.module.scss';

function Admin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { suscripcionsUser } = useSelector((state) => state.suscripcions);

  useEffect(() => {
    if (suscripcionsUser && Object.keys(user).length > 0 && Object.keys(suscripcionsUser).length === 0) {
      dispatch(listUserSubscriptions(user.name));
    }
  }, [suscripcionsUser]);

  return (
    <Container fixed sx={{ paddingLeft: '59px !important', paddingRight: '97px !important', height: '100%' }}>
      <div className={classes.wrapper_subscriptions}>
        <div className='mb-5'>
          <Title text='Suscripciones' />
        </div>
      </div>
      <Suscriptions user={user} suscriptions={suscripcionsUser} title='' />
    </Container>
  );
}

export default Admin;
