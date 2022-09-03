import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivacyPolicyContent } from '../../../redux/actions/policyAction';
import CustomMarkdown from '../../../components/CustomMarkdown';
import classes from './policyPrivacy.module.scss';
import SuraLogo from '../../../static/img/sura_logo_alt.svg';

function PolicyPrivacy() {

  const dispatch = useDispatch();
  const { policyPage } = useSelector((state) => state.policy);
  useEffect(() => {
    if (policyPage && Object.keys(policyPage).length === 0) {
      dispatch(getPrivacyPolicyContent());
    }
  }, []);

  const privacyPolicy = policyPage && policyPage?.contentSections ? policyPage?.contentSections.filter((item) => item.__component === 'elements.entry')[0] : [];
  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.navbar__content}>
          <a href='/'>
            <img src={SuraLogo} alt='' />
          </a>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className='container'>
          <h1>{ privacyPolicy?.title }</h1>
          <CustomMarkdown content={privacyPolicy?.content} />
        </div>
      </div>
    </>
  );
}

export default PolicyPrivacy;
