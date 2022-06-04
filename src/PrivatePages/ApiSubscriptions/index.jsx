/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector } from 'react-redux';
import Suscriptions from '../ProfileAdmin/containers/Suscriptions';
import classes from './ApiSubscriptions.module.scss';

function Admin() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={`w-full py-10 ${classes.margin_left}`}>
      <Suscriptions user={user} />
    </div>
  );
}

export default Admin;
