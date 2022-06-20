/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { listUserSubscriptions } from '../../redux/actions/subscriptionsAction';
import Suscriptions from '../../components/Suscriptions';
import SuscriptionsVertical from '../../components/SuscriptionsVertical';
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
  }, []);

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <div className={classes.wrapper_subscriptions}>
        <div className='mb-5'>
          <Title text='Suscripciones' />
        </div>
      </div>
      <div className={classes.wrapper_subscriptions__wide__display}>
        <Suscriptions user={user} suscriptions={suscripcionsUser} title='' />
      </div>
      <div className={classes.wrapper_subscriptions__small__display}>
        <SuscriptionsVertical user={user} suscriptions={suscripcionsUser} title='' />
      </div>
    </Container>
  );
}

export default Admin;
