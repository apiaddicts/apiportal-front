import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './customfooter.module.scss';
import config from '../../../services/config';
import CustomIcon from '../../MdIcon/CustomIcon';

function CustomFooter() {
  const { t } = useTranslation();
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div >
          <CustomIcon name="logoNeuroBlanco" className={classes.logoIcon} />
        </div>

        <div className={classes.linksSection}>
          <a href={config.legalWarningPath} target="_blank" rel="noreferrer">{t('CustomFooter.legalWarning')}</a>
          <span>|</span>
          <a href={config.privacyPolicyPath} target="_blank" rel="noreferrer">{t('CustomFooter.privacyPolicy')}</a>
          <span>|</span>
          <a href={config.cookiesPolicyPath} target="_blank" rel="noreferrer">{t('CustomFooter.cookiesPolicy')}</a>
        </div>

        <div className={classes.copySection}>
          <p>
            &copy; {year} {config.company || 'undefined'}. <strong>{t('CustomFooter.allRightsReserved')}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;
