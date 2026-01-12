/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { Container, } from '@mui/material';
import Support from '../../../components/support/support';


function SupportPriv(props) {


  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' }, paddingTop: '60px' }}>



      <Support></Support>

    </Container>
  );
}

SupportPriv.propTypes = {};

export default SupportPriv;
