import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';

import BannerCentered from '../../../components/Banner/BannerCentered';
import Button from '../../../components/Buttons/Button';
import CardBasic from '../../../components/Card/CardBasic';
import Item from '../../../components/Item/Item';
import Tabs from '../../../components/Tabs/Tabs';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import BannerImage from '../../../components/Banner/BannerImage';
import Slick from '../../../components/SlickSlider/Slick';
import Icon from '../../../components/MdIcon/Icon';
import CustomMarkdown from '../../../components/CustomMarkdown';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getLibrary, getLibraries } from '../../../redux/actions/libraryAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import config from '../../../services/config';
import codeSnipet from '../../../static/img/code-snippet.png';
import classes from './api-detail.module.scss';

function ApiDetail({ setIsOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { homePage } = useSelector((state) => state.home);
  const { library, libraries } = useSelector((state) => state.library);
  const { blogs } = useSelector((state) => state.blog);

  const [bannerImg, setBannerImg] = useState('');
  const [cardsImages, setCardsImages] = useState({});

  useEffect(() => {
    dispatch(getLibraries());
  }, []);

  useEffect(() => {
    if (library?.image?.length > 0) {
      setBannerImg(`${library.image[0].formats?.medium?.url || library.image[0].url}`);
    } else if (library && Object.keys(library).length > 0) {
      setBannerImg(config.notImage);
    }
  }, [library]);

  useEffect(() => {
    if (libraries && libraries.length > 0) {
      const imgs = {};
      libraries.forEach(lib => {
        imgs[lib.documentId] = lib.image?.length > 0
          ? `${lib.image[0].formats?.medium?.url || lib.image[0].url}`
          : config.notImage;
      });
      setCardsImages(imgs);
    }
  }, [libraries]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getLibrary(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (homePage && Object.keys(homePage).length === 0) {
      dispatch(getHomeContent());
    }

    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }

  }, []);

  // Load Banner Section
  const filterHomeBanner = homePage && homePage.contentSections && homePage.contentSections?.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const filterHomeBannerTitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.title ? filterHomeBanner[0]?.title : '';
  const filterHomeBannerSubtitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.subtitle ? filterHomeBanner[0]?.subtitle : '';
  const filterHomeBannerImage = filterHomeBanner.length > 0 && filterHomeBanner[0]?.background ? filterHomeBanner[0]?.background?.url : '';
  const filterHomeBannerNameButtom = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.name : '';
  const filterHomeBannerNameType = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.type : '/#data';

  // Load discover section
  const filterDiscoverTab = homePage && homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = homePage && homePage?.contentSections && homePage?.contentSections?.length > 0 ? homePage?.contentSections?.filter((item) => item.__component === 'sections.button-hero') : [];

  const getDocRoute = (library, id) => {
    if (library?.openDocType === 'asyncapi') {
      return `/apis/${id}/asyncapi-ui`;
    }
    return `/apis/${id}/swagger-ui`;
  };

  const buttonsLbls =
    library?.buttons?.length > 0
      ? library.buttons.map((item) => ({
          label: item?.name,
          class: item?.class,
          link: getDocRoute(library, library?.slug),
        }))
      : [
          {
            label: t('ApiDetail.tryApi'),
            class: 'primary-dinamic',
            link: getDocRoute(library, library?.slug),
          },
        ];

  const datanews = blogs?.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item?.image?.[0]?.url,
      title: item?.title,
      description: item?.description,
      linkText: t('ApiDetail.moreInfo'),
      route: `/blog/${item?.documentId}#blogDetail`,
    };
    return itemData;
  }) : [];

  const firstImageUrl = library?.image?.length > 0
    ? `${library.image[0].formats?.medium?.url || library.image[0].url}`
    : config.notImage;


  const otherApis = libraries?.filter(lib => lib.documentId !== library?.documentId) || [];
  const shuffledApis = _.shuffle(otherApis);
  const apisNews = shuffledApis.slice(0, 3);

  const handleClickPage = (id) => {
    dispatch(getLibrary(id));
  };

  return (
    <div id='api'>
      { Object.keys(library).length > 0 ? (
        <>
          <section>
            <BannerImage
              title={library?.title}
              apiId={library?.slug}
              img={bannerImg}
              buttons={buttonsLbls}
              setIsOpen={setIsOpen}
              css_styles={{ 'image_display': 'banner_custom__img--dnone', 'apiindividual_height': 'banner_apiindividual__layout--height', 'custom_line_height': 'line-height-1' }}
              redirect='/apis'
              description={library?.description?.length > 0 && library?.description ? library?.description : ''}
            />
          </section>
          <section className={`container ${classes.section__content} pb-9`}>&nbsp;</section>
          {library?.benefits && library?.benefits.length > 0 && (
            <section className='container mb-15'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 -ml-23 ${classes.section__content__title}`}>
                  <h1 className='h2 text__primary__title font-weight-bold mb-10 -ml-23 text-center'>
                    {library.benefits[0]?.title || t('Home.titleSection')}
                  </h1>
                </div>
                <div className='row px-5'>
                  <div className='flex-sm-12 flex-md-6 flex-lg-6' style={{ display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1fr)', gap: '2rem', alignContent: 'center' }}>
                      {library.benefits[0]?.Steps?.length > 0 &&
                        library.benefits[0].Steps.map((item, i) => (
                          <div key={i}>
                            <Item
                              title={item.title}
                              icon={item.number || 'note1'}
                              iconColor='rgba(0, 0, 0, 0.5)'
                              titleStyles={{ fontSize: '18px', fontWeight: '500', color: '#53565A' }}
                              iconStyle={{ width: '50px', height: '50px' }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className={`flex-sm-12 flex-md-6 flex-lg-6 container ${classes.section__content__img}`}>
                    {library.benefits[0]?.background?.url && (
                      <img src={library.benefits[0].background.url} alt={t('image')} className='w-full' />
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
          {library?.markdown && library?.markdown.length > 0 && (
            <section className={`container ${classes.section__content} pb-9`}>
              <div className='markdown__content' style={{ textAlign: 'center', fontFamily: 'var(--font-family)', lineHeight: '1.6', color: '#333' }}>
                <CustomMarkdown content={library.markdown} />
              </div>
            </section>
          )}
          <section className={classes.section__discover}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className='h2 text__primary__title text-center font-weight-bold mb-2 ml-1'>
                    {t('Home.discoverTitle')}
                  </h1>
                </div>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <p className={`subtitle-1 mb-10 text__gray__darken text-center ${classes.section__discover__subtitle}`}>
                    {t('Home.discoverSubtitle')}
                  </p>
                </div>
              </div>
              <div className='row justify-center'>
                {
                  apisNews.length > 0 && (
                    apisNews.map((card) => (
                      <div key={card.documentId} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                        <CardBasic
                          chipTitle={card?.status === 'Publicado' ? 'GET' : 'POST'}
                          title={card?.title}
                          description={card?.description}
                          info={t('ApiDetail.moreInfo')}
                          url={`/apis/${card?.documentId}#api`}
                          css_styles={{ 'override_border__chip': 'custom_border__chip' }}
                          route={() => handleClickPage(card?.documentId)}
                          img={cardsImages[card.documentId] || config.notImage}
                        />
                      </div>
                    ))
                  )
                }
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                    <div className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                      <HashLink smooth to='/apis#apiHome'>
                        <span className='mr-1'>{t('ApiDetail.seeAll')}</span>
                      </HashLink>
                      <Icon id='MdOutlineEast' />
                    </div>
                    {/* <div className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                      Ver todas
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text-center text__white mb-5 ${classes.section__works__title}`}>
                    {t('ApiDetail.howItWorks')}
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {filterDiscoverTab.map((item, i) => (
                  <div label={item?.title} key={i}>
                    <div className='row'>
                      {item.Products.map((data, x) => (
                        <div key={x + i} className='flex-lg-4 flex-md-12 flex-sm-12 py-6'>
                          <Item
                            number={data?.num}
                            title={data?.title}
                            description={data?.subtitle}
                            icon={data?.iconText}
                            type='title'
                            textColor='#d4d9db'
                            css_styles={{ 'custom_description': 'text__white' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Tabs>
              <div className='mt-10 justify-center' style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 230px))' }}>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection?.[0]?.header.map((button, i) => (
                    <div key={i} className='mb-4'>
                      {button?.isKeywordInverted ? (
                        <HashLink smooth to='/apis#apiHome'>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      ) : (
                        <HashLink smooth to={`/apis/${params?.id}#contact`}>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      )}
                    </div>
                  ))
                ) : (null)}
              </div>
            </div>
          </section>
          <section id='Banner'>
            <BannerCentered
              title={filterHomeBannerTitle !== '' ? filterHomeBannerTitle : 'Title'}
              subtitle={filterHomeBannerSubtitle !== '' ? filterHomeBannerSubtitle : ''}
              img={filterHomeBannerImage !== '' ? '' : ''}
              buttonType='tertiary'
              buttonLabel={filterHomeBannerNameButtom !== '' ? filterHomeBannerNameButtom : t('Home.discoverSubtitle')}
              redirect={filterHomeBannerNameType}
            />
          </section>
          <section className={classes.section__news}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__dark__primary'>{t('ApiDetail.news')}</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>
                    {t('ApiDetail.newsDescription')}
                  </p>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Slick slides={slidesNew} />
                </div>
              </div>
            </div>
            <div id='contact' className={`container ${classes.section__news__showmore}`}>
              <div className='row justify-center'>
                <div className={`flex-lg-2 flex-md-6 flex-sm-12 text-center ${classes.custom_top}`}>
                  <HashLink smooth to='/blog#blogIndex'>
                    <div className='text__secondary'>{t('ApiDetail.seeMore')}</div>
                  </HashLink>
                </div>
              </div>
            </div>
          </section>
          <div id='contact' />
        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default ApiDetail;
