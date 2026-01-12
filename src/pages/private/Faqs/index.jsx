

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import Faqs from '../../public/Faqs';
import { Container } from '@mui/material';

function FaqsPriv(props) {


  return (
    <Container >

      <Faqs isPrivate={true} ></Faqs>

    </Container>
  );
}

FaqsPriv.propTypes = {};

export default FaqsPriv;

