import { Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';
import DataTable from 'react-data-table-component';
import classes from './datagrid.module.scss';

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
};

function toPages(pages) {
  const results = [];

  for (let i = 1; i < pages + 1; i++) {
    results.push(i);
  }
  return results;
}

function CustomPagination({ rowCount, rowsPerPage, currentPage, onChangePage }) {

  const handlerNextPage = () => {
    onChangePage(currentPage + 1);
  };

  const handlerPreviousPage = () => {
    onChangePage(currentPage - 1);
  };

  const handlerPageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previousDisabled = currentPage === 1;

  return (
    <div className={classes.pagination}>
      <button type='button' className={classes.pagination__left} disabled={previousDisabled} onClick={handlerPreviousPage}>
        <ChevronLeftIcon className={classes.pagination__icon} />
        <span className={classes.pagination__text}>Anterior</span>
      </button>
      <div className={classes.pagination__pages}>
        {
          pageItems.map((page, index) => {
            const className = page === currentPage ? `${classes.active} ${classes.pagination__pages__page}` : `${classes.pagination__pages__page}`;
            return (
              <button type='button' className={className} key={index} onClick={handlerPageNumber} value={page}>{page > 0 && page < 10 ? `0${page}` : page}</button>
            );
          })
        }
      </div>
      <button type='button' className={classes.pagination__right} disabled={nextDisabled} onClick={handlerNextPage}>
        <span className={classes.pagination__text}>Siguiente</span>
        <ChevronRightIcon className={classes.pagination__icon} />
      </button>
    </div>
  );
}
function DataGridMUI({ headers, data, ...rest }) {
  return (
    <Card sx={{ borderRadius: '20px', marginTop: '1rem', boxShadow: '0px 4px 28px rgba(169, 177, 209, 0.12)' }}>
      <DataTable
        columns={headers}
        data={data}
        pagination
        paginationComponent={CustomPagination}
        {...rest}
        sortIcon={<ExpandMoreIcon />}
      />
    </Card>
  );
}

export default DataGridMUI;
