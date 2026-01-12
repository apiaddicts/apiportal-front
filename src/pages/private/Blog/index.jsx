

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
;
import { Container } from '@mui/material';
import Blog from '../../public/Blog';
import classes from './blogPrivate.module.scss';


function BlogPriv(props) {


  return (


    <Container size="xl" >
      <Blog isPrivate={true} />
    </Container>



  );
}

BlogPriv.propTypes = {};

export default BlogPriv;

