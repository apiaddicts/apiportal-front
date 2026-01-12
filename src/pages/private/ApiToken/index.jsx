

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import CredentialViewer from '../../../components/ApiKeys/ApiKeys';


function ApiToken() {


  return (


    <Container size="xl" >
      <CredentialViewer />
    </Container>



  );
}

ApiToken.propTypes = {};

export default ApiToken;

