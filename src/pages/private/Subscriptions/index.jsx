/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { listUserSubscriptions } from '../../../redux/actions/subscriptionsAction';
import Suscriptions from '../../../components/Suscriptions';
import SuscriptionsVertical from '../../../components/SuscriptionsVertical';
import Title from '../../../components/Title';
import classes from './subscriptions.module.scss';

function Subscriptions() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { suscripcionsUser } = useSelector((state) => state.suscripcions);

  useEffect(() => {
    dispatch(listUserSubscriptions(user.name));
  }, []);

  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <div className={classes.wrapper_subscriptions} key={Math.floor(Math.random() * 100) + 1}>
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

export default Subscriptions;
