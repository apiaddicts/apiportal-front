import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTermsContent } from '../../../redux/actions/termAction';
import CustomMarkdown from '../../../components/CustomMarkdown';
import classes from './terms.module.scss';
/*import LogoAlt from '../../../static/img/logoAlt.svg';*/

function Terms() {

  const dispatch = useDispatch();
  const { termPage } = useSelector((state) => state.term);
  useEffect(() => {
    if (termPage && Object.keys(termPage).length === 0) {
      dispatch(getTermsContent());
    }
  }, []);

  const terms = termPage && termPage.contentSections ? termPage.contentSections.filter((item) => item.__component === 'elements.entry')[0] : [];

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
          <h1>{ terms.title }</h1>
          <CustomMarkdown content={terms?.content} />
        </div>
      </div>
    </>
  );
}

export default Terms;
