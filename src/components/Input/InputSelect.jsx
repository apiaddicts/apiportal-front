/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classes from './input.module.scss';

function InputSelect() {
  const [showFilteer, setShowFilteer] = useState(false);
  const [filter, setFilter] = useState('Nombre (A-Z)');

  return (
    <div className={classes['form-group']}>
      <div onClick={
        () => { setShowFilteer(!showFilteer); }
      }
      >
        <p>
          Ordenar por:
          {' '}
          {filter}
        </p>
      </div>
      {showFilteer && (
        <div className={classes['filter-container']}>
          <p
            onClick={
              () => {
                setFilter('Nombre (A-Z)');
                setShowFilteer(false);
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
              }
            }
            className={classes['filter-option']}
          >
            Nombre (Z-A)
          </p>
        </div>
      )}
    </div>

  );
};

export default InputSelect;
