import React, { useEffect } from 'react';
import classes from './apis.module.scss';
import CustomIcon from '../../../components/MdIcon/CustomIcon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingPage } from '../../../redux/actions/settingPageAction';
import { getMediaUrl } from '../../../services/config';

const CardLibrary = ({ api }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { settingPage } = useSelector((state) => state.settingPage);

  useEffect(() => {
    if (!settingPage || Object.keys(settingPage).length === 0) {
      dispatch(getSettingPage());
    }
  }, [dispatch, settingPage]);

  const logoUrl = settingPage?.Logo?.url
    ? getMediaUrl(settingPage.Logo.url)
    : null;

  return (
    <div className={classes.card}>
      <div className={classes.card__header}>
        {logoUrl ? (
          <img src={logoUrl} alt='Logo' style={{ height: '40px' }} />
        ) : (
          <CustomIcon name='logo' />
        )}
      </div>
      <div className={classes.card__content}>
        <h3 className={classes.card__title}>{api.slug}</h3>
        <span className={classes.card__slug}>{api.slug || api.assetId.toLowerCase()}</span>
        <p className={classes.card__description}>
          {api.description || 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adip cing dui. Vestibulum volutpat pretium libero.'}
        </p>
        <a
          href={`/developer/apis/${api.slug}`}
          className={classes.card__button}
        >
          {t('LibraryPaginated.viewDocumentation')} <span>➜</span>
        </a>
      </div>
    </div>
  );
};

export default CardLibrary;
