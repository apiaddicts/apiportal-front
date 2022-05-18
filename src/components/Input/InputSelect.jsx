/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from './input.module.scss';

function InputSelect({ label, children, handleSelect }) {
  const [showFilteer, setShowFilteer] = useState(false);
  const [filter, setFilter] = useState('Nombre (A-Z)');

  const handleChange = (sort) => {
    handleSelect(sort);
  };

  return (
    <div className={classes['form-wrapper-group']}>
      <div className={classes['form-group']}>
        <div
          className='w-full'
          onClick={
            () => { setShowFilteer(!showFilteer); }
          }
        >
          <p>
            Ordenar por:
            {' '}
            <span>{filter}</span>
          </p>
        </div>
        {showFilteer && (
          <div className={classes['filter-container']}>
            <p
              onClick={
                () => {
                  setFilter('Nombre (A-Z)');
                  setShowFilteer(false);
                  handleChange('asc');
                }
              }
              className={classes['filter-option']}
            >
              Nombre (A-Z)
            </p>
            <p
              onClick={
                () => {
                  setFilter('Nombre (Z-A)');
                  setShowFilteer(false);
                  handleChange('desc');
                }
              }
              className={classes['filter-option']}
            >
              Nombre (Z-A)
            </p>
          </div>
        )}
        <div
          className={classes['filter-icon']}
          onClick={
            () => { setShowFilteer(!showFilteer); }
          }
        >
          <ExpandMoreIcon sx={{ fontSize: '1.5rem' }} />
        </div>
      </div>
    </div>

  );
};

export default InputSelect;
