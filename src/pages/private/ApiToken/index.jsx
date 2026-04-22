

import React, { useState } from 'react';
import { Container } from '@mui/material';

import CredentialViewer from '../../../components/Credentials/index';
import CreateCredential from '../../../components/Credentials/CreateCredential';

function ApiToken() {
  const [view, setView] = useState('list');

  return (
    <Container maxWidth="xl">
      {view === 'list' ? (
        <CredentialViewer onCreateNew={() => setView('create')} />
      ) : (
        <CreateCredential
          onBack={() => setView('list')}
          onCreated={() => setView('list')}
        />
      )}
    </Container>
  );
}

ApiToken.propTypes = {};

export default ApiToken;


