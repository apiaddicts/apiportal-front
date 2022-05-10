/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';

import { Container, Card, Grid, Box, Stack, Typography, Chip, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import Title from '../../components/Title/Title';
import Btn from '../../components/Buttons/Button';
import DataGridMUI from '../../components/common/DataGridMUI/DataGridMUI';
import { fieldsAppSandbox, fieldsAppPre } from '../AddApp/field';
import CustomTooltip from '../../components/common/ToolTip';
import { TypographyUI } from '../../components/common/TypographyMUI/style';
import TextField from '../../components/common/InputMUI';

import useNewApp from '../../hooks/useNewApp';
import classes from './detail.module.scss';

import jsonApis from '../../data-table.json';

function AppsDetail(props) {
  const handleSubmit = async (dataForm) => {
    console.log(dataForm);
  };

  const navigate = useNavigate();
  const handleNavigate = useCallback(() => navigate('/apps/apis', { replace: true }, [navigate]));

  const formConfig = useNewApp(fieldsAppSandbox, handleSubmit);
  const formConfigPre = useNewApp(fieldsAppPre, handleSubmit);

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
            <Chip label={`v ${row.version}`} />
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
    <Container className='mt-10 pt-10'>
      <Link to={-1}> Volver</Link>
      <Title text='Apps detail' />
      <Card sx={{ borderRadius: '20px', marginTop: '1rem', paddingTop: '36px', paddingLeft: '41px', paddingRight: '45px', paddingBottom: '40px', marginBottom: '50px' }}>
        {/* <CardHeader sx={{ flex: '1 0 auto' }}> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <span className='subtitle-2'>
              <b>Usuario: </b>
              marco.antonio@cloudappi.net
            </span>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              justifyContent='flex-end'
            >
              <Grid item>
                <span className='subtitle-2'>
                  <b>Fecha de creación: </b>
                  12 de Marzo de 2021
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '0px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <span className='subtitle-2'>
              <b>Descripción</b>
            </span>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              justifyContent='flex-end'
            >
              <Grid item>
                <Button startIcon={<EditIcon sx={{ color: '#0033A0' }} />} size='medium'>
                  <span className={`caption ${classes.colorBtn}`}>
                    EDITAR
                  </span>
                </Button>
                {/* <span className='caption'>
                  EDITAR
                </span> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '-25px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <p className='subtitle-2'>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quas corporis nostrum
              nisi corrupti facere alias ipsa saepe
              beatae voluptatum? Quod expedita culpa aspernatur. Iure placeat impedit aperiam quae ab ea?
            </p>
          </Grid>
        </Grid>
        {/* </CardHeader> */}
      </Card>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Title text='APIs de la App' divider={false} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} className={classes.gridEnd}>
          <div className={classes.buttonApi}>
            <Btn styles='primary' onClick={handleNavigate}>
              Añadir API
              <ArrowForwardIosIcon sx={{ fontSize: '16px', marginLeft: '8px' }} />
            </Btn>
          </div>

        </Grid>
      </Grid>
      <Box sx={{ marginBottom: '50px' }}>
        <DataGridMUI
          headers={headers}
          data={jsonApis}
          // selectableRows
          paginationPerPage={5}
        />
      </Box>
      <Title text='Conexion' divider={false} />
      <Card sx={{ borderRadius: '20px', marginTop: '33px', padding: '35px 47px 43px 41px', marginBottom: '15px' }}>
        <Box sx={{ height: '100%' }}>
          <Box sx={{ mt: 4 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
              <CustomTooltip text='ETORNO SANDBOX'>
                ?
              </CustomTooltip>
              <TypographyUI>
                ENTORNO SANDBOX
              </TypographyUI>
            </Box>
            <div className='row'>
              {fieldsAppSandbox.map((field) => (
                <div key={field.id} className='flex-lg-4 flex-sm-12'>
                  <TextField field={field} formik={formConfig} iconCopy iconEye />
                </div>
              ))}
            </div>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
              <CustomTooltip text='ENTORNO PRE'>
                ?
              </CustomTooltip>
              <TypographyUI>
                ENTORNO PRE
              </TypographyUI>
            </Box>
            <div className='row'>
              {fieldsAppPre.map((field) => (
                <div key={field.id} className='flex-lg-4 flex-sm-12'>
                  <TextField field={field} formik={formConfigPre} iconCopy iconEye />
                </div>
              ))}
            </div>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', pr: 2 }}>
              <CustomTooltip text='ENTORNO PRODUCCIÓN'>
                ?
              </CustomTooltip>
              <TypographyUI>
                ENTORNO PRODUCCIÓN
              </TypographyUI>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={4}>
              <div className={classes.btn}>
                <Btn styles='primary'>
                  Solicitar pase a producción
                </Btn>
              </div>

            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default AppsDetail;
