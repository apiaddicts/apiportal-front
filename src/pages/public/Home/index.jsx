/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
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

moment.locale('es');

function Home({ setOpenForm }) {
  const dispatch = useDispatch();
  const { homePage } = useSelector((state) => state.home);
  const { blogs } = useSelector((state) => state.blog);
  const { libraries } = useSelector((state) => state.library);

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
      imgSrc: i.imgSrc && i.imgSrc.length > 0 ? i.imgSrc[0].url : '',
      title: i.title,
      actionButtons: i.actionButtons ? i.actionButtons : null,
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

  const datanews = blogs && blogs.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item?.image?.[0]?.url,
      title: item?.title,
      description: item?.description,
      linkText: 'Conoce más',
      route: `/blog/${item?.id}#blogDetail`,
    };
    return itemData;
  }) : [];

  const random = libraries && libraries.length > 0 && Math.floor(Math.random() * libraries.length);
  const random2 = libraries && libraries.length > 0 && Math.floor(Math.random() * libraries.length);
  const random3 = libraries && libraries.length > 0 && Math.floor(Math.random() * libraries.length);

  const apisNews = libraries && libraries.length > 0 ? [libraries[random], libraries[random2], libraries[random3]] : [];

  return (
    <div style={{ paddingTop: '114px' }}>
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
                  {titleSection || ''}
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
                <img src={backgroundSection || config.notImage} alt='' />
              </div>
            </div>
          </section>

          {/* Como funciona */}
          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text__white mb-5 ${classes.section__works__title}`}>
                    {filterWorks && filterWorks.length > 0 && filterWorks[0]?.title ? filterWorks[0]?.title : ''}
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
                  {filterDiscoverTitle || ''}
                </h1>
              </div>
            </div>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <p className={`subtitle-1 mb-10 text__primary__subtitle primary-font text-center ${classes.section__discover__subtitle}`}>
                  {filterDiscoverSubtitle || ''}
                </p>
              </div>
            </div>
            {apisNews && apisNews.length > 0 ? (
              <>
                <div className='row'>
                  {apisNews.map((card, i) => (
                    <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                      <CardBasic chipTitle='' title={card?.title} description={card?.description} info='MÁS INFORMACIÓN' url={`/apis/${card?.id}#api`} />
                    </div>
                  ))}
                </div>
                {/*<div className='container'>
                    <div className='row'>
                        <div className='flex-md-12 flex-sm-12 pxs-none'>
                        <Slick slides={filterDiscover && filterDiscover.length > 0 && filterDiscover[0]?.useCaseList} />
                        </div>
                    </div>
                    </div>*/}
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12'>
                    <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                      <HashLink smooth to='/apis#apiHome' className={`button link__tertiary d-xs-none ${classes.section__discover__showmore__button}`}>
                        <span className='mr-1'>ver todas</span>
                        <div className={classes.section__discover__showmore__button__chevron}>
                          <CustomIcon name='chevron_right' />
                        </div>
                      </HashLink>
                      <HashLink smooth to='/apis#apiHome' className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                        Ver todas
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
                  <h1>No hay APIs disponibles</h1>
                </div>
              </section>
            )}
          </section>
          {/* Nuestras Experiencias */}
          {/*<section className={classes.section__experiences}>
            <div className='container'>
              <div className={classes.section__experiences__title}>
                <h1 className='h2 text__primary mb-2'>
                  {filterWorks && filterWorks.length > 1 && filterWorks[1]?.title ? filterWorks[1]?.title : ''}
                </h1>
              </div>
              <div className={`d-xs-none ${classes.section__experiences__subtitle}`}>
                <p className='body-1'>
                  {filterWorks && filterWorks.length > 1 && filterWorks[1]?.subtitle ? filterWorks[1]?.subtitle : ''}
                </p>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Tabs line={true}>
                    {
                      filterTabCard && filterTabCard.length > 0 ? (
                        filterTabCard.map((tab, i) => (
                          <div key={i} label={tab?.name}>
                            <div className='row'>
                              <div className='flex-md-12 flex-sm-12'>
                                <div className={classes.section__experiences__content}>
                                  <div className={classes.section__experiences__content__img}>
                                    <div className={classes.section__experiences__content__img__overlay}>
                                      <img src={tab?.img.length > 0 ? tab?.img[0].url : ''} alt='' />
                                    </div>
                                  </div>
                                  <div className={`d-xs-none ${classes.section__experiences__content__card}`}>
                                    <CardSlider lists={tab?.cards.length > 0 ? tab?.cards : []} />
                                  </div>
                                  <div className='container d-xs-only'>
                                    <div className='row'>
                                      <div className='flex-md-12 flex-sm-12'>
                                        <Slick slides={tab?.cards.length > 0 ? tab?.cards : []} tabCard={true} footerTabCard={tab?.cards[i]} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (null)
                    }
                  </Tabs>
                </div>
              </div>
            </div>
          </section>*/}
          {/* Integra */}
          <section id='Banner'>
            <BannerCentered
              title={filterHomeBannerTitle !== '' ? filterHomeBannerTitle : ''}
              subtitle={filterHomeBannerSubtitle !== '' ? filterHomeBannerSubtitle : ''}
              img={filterHomeBannerImage !== '' ? '' : ''}
              buttonType='tertiary'
              buttonLabel={filterHomeBannerNameButtom !== '' ? filterHomeBannerNameButtom : ''}
              redirect={filterHomeBannerNameTarget}
              setOpenForm={setOpenForm}
            />
          </section>
          {/* Novedades */}
          <section className={`${classes.section__news} ${classes.section__news__content}`}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__dark__primary'>{filterWorks && filterWorks.length > 1 && filterWorks[1]?.title ? filterWorks[1]?.title : ''}</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1 secondary-font text__gray__lighten'>{filterWorks && filterWorks.length > 1 && filterWorks[1]?.subtitle ? filterWorks[1]?.subtitle : ''}</p>
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
                        <div>Ver Más</div>
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
                  <h1>Aún no hay entradas en el blog</h1>
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

