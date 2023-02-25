import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BannerStatic from '../../../components/Banner/BannerStatic';
import CustomMarkdown from '../../../components/CustomMarkdown';
import { getLegalNoticeContent } from '../../../redux/actions/termAction';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';

function index(props) {

  const dispatch = useDispatch();
  const { legalReq, legalRes } = useSelector((state) => state.term);

  useEffect(() => {
    dispatch(getLegalNoticeContent());
  }, []);

  const legalBanner = legalRes && legalRes.contentSections && legalRes.contentSections?.length > 0 ? legalRes.contentSections.filter((item) => item.__component === 'home.banner-section').map((banner) => {
    return {
      title: banner.title,
      imgUrl: banner.background.url,
    };
  }) : [];

  const legalContent = legalRes && legalRes.contentSections && legalRes.contentSections?.length > 0 ? legalRes.contentSections.filter((item) => item.__component === 'elements.entry').map((item) => {
    return {
      markdownContent: item.content,
    };
  }) : [];

  return (
    <div className='div__container__pt'>
      {legalReq ? (<SkeletonComponent />) : (
        <div>
          {legalBanner && Object.keys(legalBanner).length > 0 ? legalBanner.map((item, index) => (
            <BannerStatic
              title={item.title}
              img={item.imgUrl}
              key={index}
            />
          )) : null}
          <section className='container'>
            <div className='row'>
              <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                {legalContent && Object.keys(legalContent).length > 0 ? legalContent.map((item, index) => (
                  <div className='legal__notice__mk section__content'>
                    <CustomMarkdown content={item.markdownContent} key={index} />
                  </div>
                )) : <p>Informacion no disponible</p>}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

index.propTypes = {};

export default index;
