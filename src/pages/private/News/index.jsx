

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
;
import { Container } from '@mui/material';
import Blog from '../../public/Blog';
import classes from './newsPrivate.module.scss';


function NewsPriv(props) {


  return (



      <Blog isPrivateNews={true} />




  );
}

NewsPriv.propTypes = {};

export default NewsPriv;

