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
    <div className={`w-full py-10 ${classes.margin_left}`}>
      <Container fixed className='my-10 py-10' maxWidth='xl'>
        <div className={classes.wrapper_subscriptions}>
          <div className='w-full my-9'>
            <Title text='Suscripciones' />
          </div>
        </div>
        <Suscriptions user={user} suscriptions={suscripcionsUser} />
      </Container>
    </div>
  );
}

export default Admin;
