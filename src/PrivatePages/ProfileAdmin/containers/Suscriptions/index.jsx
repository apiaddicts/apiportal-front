/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Container } from '@mui/material';
import DataGridMUI from '../../../../components/common/DataGridMUI/DataGridMUI';
import tableHeaders from './tableHeaders';
import data from './suscriptions.json';
import classes from './Suscriptions.module.scss';

function Suscriptions(props) {
  return (
    <Container className='my-10'>
      <div className={classes.wrapper}>
        <div className='w-full'>
          <div className='font-fs-joey fs__36 font-weight-bold text__primary'>Suscripciones</div>
          <DataGridMUI headers={tableHeaders} data={data} paginationPerPage={20} />
        </div>
      </div>
    </Container>
  );
}

Suscriptions.propTypes = {};

export default Suscriptions;
