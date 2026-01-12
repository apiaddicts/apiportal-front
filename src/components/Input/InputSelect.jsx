/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import classes from './input.module.scss';

function InputSelect({ label, children, handleSelect }) {
  const { t } = useTranslation();
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
          <p className='fs__14'>
            {t('InputSelect.orderBy')}:
            {' '}
            <span className='fs__13'>{filter}</span>
          </p>
        </div>
        {showFilteer && (
          <div className={classes['filter-container']}>
            <p
              onClick={
                () => {
                  setFilter(t('InputSelect.nameAsc'));
                  setShowFilteer(false);
                  handleChange('asc');
                }
              }
              className={classes['filter-option']}
            >
              {t('InputSelect.nameAsc')}
            </p>
            <p
              onClick={
                () => {
                  setFilter(t('InputSelect.nameDesc'));
                  setShowFilteer(false);
                  handleChange('desc');
                }
              }
              className={classes['filter-option']}
            >
              {t('InputSelect.nameDesc')}
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
