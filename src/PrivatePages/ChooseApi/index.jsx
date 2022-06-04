import { Box, Chip, Container, IconButton, Stack, Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Buttons/Button';
import DataGridMUI from '../../components/common/DataGridMUI/DataGridMUI';
import Title from '../../components/Title/Title';
import jsonApis from '../../data-table.json';

function index(props) {
  const idApi = localStorage.getItem('id');
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => navigate(`/products/${idApi}`, { replace: true }, [navigate]));

  const headers = [
    {
      name: 'API',
      maxWidth: '250px',
      // selector: (row) => row.app,
      sortable: true,
      cell: (row) => {
        return (
          <Stack direction='row' spacing={2}>
            <Typography variant='body2' color='textSecondary'>
              {row.apis}
            </Typography>
            <Chip label={`v ${row.version}`} size='small' />
          </Stack>
        );
      },
    },
    {
      name: 'SOLUCIÓN',
      maxWidth: '250px',
      selector: (row) => row.enviroment,
      sortable: true,
    },
    {
      name: 'DESCRIPCIÓN',
      maxWidth: '450px',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      maxWidth: '20px',
      cell: (row) => {
        return (
          <IconButton
            sx={{
              borderRadius: '6px',
              padding: '1px',
              background: '#ECF0F1',
            }}
          >
            <ContentCopyOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Container sx={{ height: '100vh' }} className='my-10 py-10' fixed>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Title text='Apps detail' />
        <Chip label='SANDBOX' size='small' sx={{ margin: '0 50px' }} />
      </Box>
      <Box className='mt-8'>
        <Typography className='h3 text__primary font-weight-bold font-fs-joey'>
          Selecciona tu API
        </Typography>
      </Box>
      <Box>
        <DataGridMUI
          headers={headers}
          data={jsonApis}
          paginationPerPage={5}
          selectableRows
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', justifyItems: 'end', marginTop: '45px' }}>
        <Btn styles='primary' style={{ gridColumn: '12/12' }} onClick={handleNavigate}>
          Añadir API
          <ArrowForwardIosIcon sx={{ fontSize: '16px', marginLeft: '8px' }} />
        </Btn>
      </Box>
    </Container>
  );
}

export default index;
