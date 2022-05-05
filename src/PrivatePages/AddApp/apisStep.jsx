/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Container, Checkbox, Typography, Box, Stack, Chip } from '@mui/material';
import DataGridMUI from '../../components/common/DataGridMUI/DataGridMUI';
import jsonApis from '../../data-table.json';
import { ContainerIcon } from '../../components/common/InputMUI/style';
import Icon from '../../components/MdIcon/Icon';

;

function ApisStep({ styles }) {

  const copyToClipboard = (value) => {
    const input = document.createElement('input');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  const headers = [
    {
      name: 'APIS',
      sortable: true,
      cell: (row) => {
        return (
          <Stack direction='row' spacing={2}>
            <Typography variant='body2' color='textSecondary'>
              {row.apis}
            </Typography>
            <Chip label={`v ${row.version}`} />
          </Stack>
        );
      },
    },
    {
      name: 'DESCRIPCIÓN',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: '',
      cell: (row) => {
        return (
          <ContainerIcon onClick={() => {
            copyToClipboard(row.apis);
          }}
          >
            <Icon id='MdOutlineContentCopy' />
          </ContainerIcon>
        );
      },
    },
  ];
  const data = jsonApis;

  return (
    <Container>
      <Box mb={2}>
        <Typography variant='h5' className={styles['color-primary']}>
          APIs de banca
        </Typography>
        <DataGridMUI
          headers={headers}
          data={data}
          selectableRows
          selectableRowsComponent={Checkbox}
          paginationPerPage={3}
        />
      </Box>
      <Box mt={8} mb={8}>
        <Typography variant='h5' className={styles['color-primary']}>
          APIs de otras soluciones
        </Typography>
        <DataGridMUI
          headers={headers}
          data={data}
          selectableRows
          selectableRowsComponent={Checkbox}
          paginationPerPage={3}
        />
      </Box>
    </Container>
  );
}

export default ApisStep;
