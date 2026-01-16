/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import moment from 'moment';
import _ from 'underscore';
import { getHomeContent } from '../../../redux/actions/homeAction';
import { getBlogs } from '../../../redux/actions/blogAction';
import { getLibraries } from '../../../redux/actions/libraryAction';
import Item from '../../../components/Item/Item';
//import Icon from '../../../components/MdIcon/Icon';
import CardBasic from '../../../components/Card/CardBasic';
//import CardSlider from '../../../components/Card/CardSlider';
import BannerCentered from '../../../components/Banner/BannerCentered';
import Tabs from '../../../components/Tabs/Tabs';
import Button from '../../../components/Buttons/Button';
import Slider from '../../../components/Slider/Slider';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Slick from '../../../components/SlickSlider/Slick';
import classes from './home.module.scss';
import CustomIcon from '../../../components/MdIcon/CustomIcon';
import config from '../../../services/config';
import { useTranslation } from 'react-i18next';

moment.locale('es');

function Home({ setOpenForm }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { homePage } = useSelector((state) => state.home);
  const { blogs } = useSelector((state) => state.blog);
  const { libraries } = useSelector((state) => state.library);
  const [cardsImages, setCardsImages] = useState({});

  useEffect(() => {
    if (libraries && libraries.length > 0) {
      const imgs = {};
      libraries.forEach(lib => {
        imgs[lib.id] = lib.image?.length > 0
          ? `${lib.image[0].formats?.medium?.url || lib.image[0].url}`
          : config.notImage;
      });
      setCardsImages(imgs);
    }
  }, [libraries]);

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

  // Load Slider
  const filterSlider = homePage && homePage.contentSections ? homePage.contentSections.filter((item) => item.__component === 'custom.carousel') : [];
  const slides = filterSlider.length > 0 ? filterSlider[0].sliderCarousel.map((i) => {
    const response = {
      imgSrc: i.imgSrc ? i.imgSrc.url : '',
      title: i.title,
      actionButtons: i.actionButtons ? i.actionButtons : null,
      subtitleList: i.subtitleList ? i.subtitleList : null,
    };
    return response;
  }) : [];
  // Load section
  const filterSection = homePage && homePage.contentSections ? homePage.contentSections.filter((item) => item.__component === 'home.work-section') : [];
  const titleSection = filterSection.length > 0 && filterSection.length === 1 && filterSection[0].title ? filterSection[0].title : '';
  const backgroundSection = filterSection.length > 0 && filterSection.length === 1 && filterSection[0].background ? filterSection[0].background.url : '';
  const itemsSection = filterSection.length > 0 && filterSection.length === 1 && filterSection[0].Steps ? filterSection[0].Steps.map((i) => {
    const response = {
      icon: i.number,
      title: i.title,
      description: i.subtitle,
    };
    return response;
  }) : [];

  // Load title works and experiences
  const filterWorks = homePage && homePage.contentSections && homePage.contentSections.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'sections.title-section') : [];

  // Load discover section
  const filterDiscoverTab = homePage && homePage.contentSections && homePage.contentSections.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = homePage && homePage.contentSections && homePage.contentSections.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'sections.button-hero') : [];

  // Load discover section
  const filterDiscover = homePage && homePage.contentSections && homePage.contentSections.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'sections.section-use-case') : [];
  const filterDiscoverTitle = filterDiscover.length > 0 && filterDiscover[0]?.title ? filterDiscover[0]?.title : '';
  const filterDiscoverSubtitle = filterDiscover.length > 0 && filterDiscover[0]?.subtitle ? filterDiscover[0]?.subtitle : '';

  // Load tab cards
  //const filterTabCard = homePage && homePage.contentSections && homePage.contentSections?.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'custom.tab-card') : [];

  // Load tab cards
  const filterHomeBanner = homePage && homePage.contentSections && homePage.contentSections?.length > 0 ? homePage.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const filterHomeBannerTitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.title ? filterHomeBanner[0]?.title : '';
  const filterHomeBannerSubtitle = filterHomeBanner.length > 0 && filterHomeBanner[0]?.subtitle ? filterHomeBanner[0]?.subtitle : '';
  const filterHomeBannerImage = filterHomeBanner.length > 0 && filterHomeBanner[0]?.background ? filterHomeBanner[0]?.background?.url : '';
  const filterHomeBannerNameButtom = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.name : '';
  const filterHomeBannerNameTarget = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons.length > 0 ? filterHomeBanner[0]?.buttons?.[0]?.target : '/#data';
  const filterHomeBannerLink = filterHomeBanner.length > 0 && filterHomeBanner[0]?.buttons?.length > 0 ? filterHomeBanner[0].buttons[0].link : null;
  const datanews = blogs && blogs.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item?.image?.[0]?.url,
      title: item?.title,
      description: item?.description,
      linkText: t('Home.learnMore'),
      route: `/blog/${item?.id}#blogDetail`,
    };
    return itemData;
  }) : [];

  const apisNews =
    libraries && libraries.length > 0
      ? _.shuffle(libraries).slice(0, 3)
      : [];

  return (
    <div>
      {homePage && Object.keys(homePage).length > 0 ? (
        <div>
          <section>
            <Slider slides={slides} />
          </section>
          {/* Beneficios principales */}
          <section className={`container ${classes.section__content}`}>
            <div className='row'>
              <div className='flex-md-12 flex-md-12 flex-lg-12 flex-sm-12'>
                <h1 className='h3 text__dark__primary font-weight-bold mb-5 text-center'>
                  {t('Home.titleSection') || ''}
                </h1>
              </div>
            </div>
            <div className='row align-center'>
              <div className={`flex-md-12 flex-md-6 flex-lg-6 flex-sm-12 ${classes.section__content__items}`}>
                {itemsSection.map((item, i) => (
                  <Item
                    key={i}
                    title={item?.title}
                    description={item?.description}
                    icon={item?.icon}
                    iconColor='rgba(0,0,0,0.8)'
                    css_styles={{ 'custom_description': 'text__gray__darken' }}
                  />
                ))}
              </div>
              <div className={`flex-md-5 flex-lg-5 flex-sm-12 ${classes.section__content__img}`}>
                <img src={backgroundSection || config.notImage} alt={t('Home.noImage')} />
              </div>
            </div>
          </section>

          {/* Como funciona */}
          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text__white mb-5 ${classes.section__works__title}`}>
                    {t('Home.worksTitle') || ''}
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {
                  filterDiscoverTab.map((item, i) => (
                    <div label={item?.title} key={i}>
                      <div className='row'>
                        {item.Products.map((data, x) => (
                          <div key={x} className='flex-lg-4 flex-md-12 flex-sm-12 py-6'>
                            <Item
                              number={data?.num}
                              title={data?.title}
                              description={data?.subtitle}
                              icon={data?.iconText}
                              type='title'
                              textColor='#ECF0F1'
                              css_styles={{ 'custom_description': 'text__white' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </Tabs>
              <div className={`mt-10 justify-center ${classes.section__works__buttons}`}>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection[0]?.header.map((button, i) => (
                    <div key={i} className='mb-4'>
                      {button?.isKeywordInverted ? (
                        <HashLink smooth to='/apis#apiHome'>
                          <Button styles={button?.keyword}>
                            {button?.title}
                          </Button>
                        </HashLink>
                      ) : (
                        <HashLink smooth to='/#data'>
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

          {/* Descubre nuestras APis */}
          <section className={`container ${classes.section__discover__sc}`}>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <h1 className={`h2 text__primary__title font-weight-bold text-center ${classes.section__discover__title}`}>
                  {t('Home.discoverTitle') || ''}
                </h1>
              </div>
            </div>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <p className={`subtitle-1 mb-10 text__primary__subtitle primary-font text-center ${classes.section__discover__subtitle}`}>
                  {t('Home.discoverSubtitle') || ''}
                </p>
              </div>
            </div>
            {apisNews && apisNews.length > 0 ? (
              <>
                <div className='row justify-center'>
                  {apisNews.map((card, i) => {
                    return (
                      <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                        <CardBasic
                          chipTitle=''
                          title={card?.title}
                          description={card?.description}
                          info={t('Home.moreInfo')}
                          url={`/apis/${card?.id}#api`}
                          img={cardsImages[card.id] || config.notImage}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12'>
                    <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                      <HashLink smooth to='/apis#apiHome' className={`button link__tertiary d-xs-none ${classes.section__discover__showmore__button}`}>
                        <span className='mr-1'>{t('Home.seeAll')}</span>
                        <div className={classes.section__discover__showmore__button__chevron}>
                          <CustomIcon name='chevron_right' />
                        </div>
                      </HashLink>
                      <HashLink smooth to='/apis#apiHome' className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                        {t('Home.seeAll')}
                      </HashLink>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <section
                style={{
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '2rem',
                  }}
                >
                  <h1>{t('Home.noApis')}</h1>
                </div>
              </section>
            )}
          </section>

          {/* Integra */}
          <section id='Banner'>
            <BannerCentered
              title={filterHomeBannerTitle !== '' ? filterHomeBannerTitle : ''}
              subtitle={filterHomeBannerSubtitle !== '' ? filterHomeBannerSubtitle : ''}
              img={filterHomeBannerImage !== '' ? filterHomeBannerImage : ''}
              buttonType='tertiary'
              buttonLabel={filterHomeBannerNameButtom !== '' ? filterHomeBannerNameButtom : ''}
              redirect={filterHomeBannerLink}
              setOpenForm={setOpenForm}
            />
          </section>

          {/* Novedades */}
          <section className={`${classes.section__news} ${classes.section__news__content}`}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__dark__primary'>{filterWorks && filterWorks.length > 1 && filterWorks[1]?.title ? filterWorks[1]?.title : t('Home.news')}</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1 secondary-font text__gray__lighten'>{filterWorks && filterWorks.length > 1 && filterWorks[1]?.subtitle ? filterWorks[1]?.subtitle : t('Home.newsDescription')}</p>
                </div>
              </div>
            </div>
            {slidesNew && slidesNew.length > 0 ? (
              <>
                <div className='container'>
                  <div className='row'>
                    <div className='flex-md-12 flex-sm-12'>
                      <Slick slides={slidesNew} />
                    </div>
                  </div>
                </div>
                <div className={`container ${classes.section__news__showmore}`}>
                  <div className='row justify-center'>
                    <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center mt-8'>
                      <HashLink smooth to='/blog#blogIndex' className='link__tertiary'>
                        <div>{t('Home.seeMore')}</div>
                      </HashLink>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <section
                style={{
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '2rem',
                  }}
                >
                  <h1>{t('Home.noBlogEntries')}</h1>
                </div>
              </section>
            )}
          </section>
          <div id='data' />
        </div>
      ) : (
        <SkeletonComponent />
      )}
    </div>

  );
}

export default Home;

