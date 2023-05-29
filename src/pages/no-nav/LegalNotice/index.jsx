import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLegalNoticeContent } from '../../../redux/actions/termAction';
import CustomMarkdown from '../../../components/CustomMarkdown';
import classes from './legalNotice.module.scss';

function LegalNotice(props) {

  const dispatch = useDispatch();
  const { legalRes } = useSelector((state) => state.term);

  useEffect(() => {
    if (legalRes && Object.keys(legalRes).length === 0) {
      dispatch(getLegalNoticeContent());
    }
  }, []);

  const legalContent = legalRes && legalRes?.contentSections ? legalRes?.contentSections.filter((item) => item.__component === 'elements.entry')[0] : [];

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.navbar__content}>
          {/*<a href='/'>
            <img src={LogoAlt} alt='' />
          </a>*/}
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className='container'>
          <h1>{ legalContent?.title }</h1>
          <CustomMarkdown content={legalContent?.content} />
        </div>
      </div>
    </>
  );
}

LegalNotice.propTypes = {};

export default LegalNotice;
