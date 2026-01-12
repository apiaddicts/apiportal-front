/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './inputui.module.scss';

function SelectUI({ label, defaultValue, options = [] }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(defaultValue && defaultValue.length);
  const [currentValue, setValue] = useState(defaultValue);

  const handleSelect = (e) => {
    if (e.target.value !== '') {
      setIsActive(true);
      setValue(e.target.value);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className={classes.wrapper__input}>
      <select placeholder={t('SelectUI.placeholder')} value={currentValue} onChange={handleSelect}>
        {
          options.length > 0 ? (
            options.map((opt, i) => {
              return (
                <option key={i} value={opt.value}>{t(opt.text)}</option>
              );
            })
          ) : (<option value='0'>{t('SelectUI.noOptions')}</option>)
        }
      </select>
      <label className={isActive ? `${classes.active}` : ''}>{t(label)}</label>
    </div>
  );
}

export default SelectUI;
