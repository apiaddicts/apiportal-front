/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HashLink } from 'react-router-hash-link';

import Item from '../components/Item/Item';
import classes from '../styles/pages/home.module.scss';
import Icon from '../components/MdIcon/Icon';
import CardBasic from '../components/Card/CardBasic';
import CardSlider from '../components/Card/CardSlider';
import BannerCentered from '../components/Banner/BannerCentered';
import Tabs from '../components/Tabs/Tabs';
import Button from '../components/Buttons/Button';
// import Carousel from '../components/Carousel/Carousel';
import Slider from '../components/Slider/Slider';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import textureCircles from '../static/img/texture_circles.svg';
import textureCirclesAlt from '../static/img/texture_circles_alt.svg';
import { getHome } from '../redux/actions/homeAction';
import Slick from '../components/SlickSlider/Slick';

function Home({ setIsOpen }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.demo);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      dispatch(getHome());
    }
  }, []);

  // Load Slider
  const filterSlider = data && data.contentSections ? data.contentSections.filter((item) => item.__component === 'sura.carousel') : [];
  const slides = filterSlider.length > 0 ? filterSlider[0].sliderCarousel.map((i) => {
    const response = {
      imgSrc: i.imgSrc && i.imgSrc.length > 0 ? i.imgSrc[0].url : 'https://picsum.photos/1920/630',
      title: i.title,
      actionButtons: i.actionButtons ? i.actionButtons : null,
    };
    return response;
  }) : [];
  // Load section
  const filterSection = data && data.contentSections ? data.contentSections.filter((item) => item.__component === 'home.work-section') : [];
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
  const filterWorks = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.title-section') : [];

  // Load discover section
  const filterDiscoverTab = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.button-hero') : [];

  // Load discover section
  const filterDiscover = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.section-use-case') : [];
  const filterDiscoverTitle = filterDiscover.length > 0 && filterDiscover.length === 1 && filterDiscover[0].title ? filterDiscover[0].title : '';
  const filterDiscoverSubtitle = filterDiscover.length > 0 && filterDiscover.length === 1 && filterDiscover[0].subtitle ? filterDiscover[0].subtitle : '';

  // Load tab cards
  const filterTabCard = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sura.tab-card') : [];

  const filterHomeBanner = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const filterHomeBannerTitle = filterHomeBanner.length > 0 && filterHomeBanner.length === 1 && filterHomeBanner[0].title ? filterHomeBanner[0].title : '';
  const filterHomeBannerSubtitle = filterHomeBanner.length > 0 && filterHomeBanner.length === 1 && filterHomeBanner[0].subtitle ? filterHomeBanner[0].subtitle : '';
  const filterHomeBannerImage = filterHomeBanner.length > 0 && filterHomeBanner.length === 1 && filterHomeBanner[0].background ? filterHomeBanner[0].background.url : '';
  const filterHomeBannerNameButtom = filterHomeBanner.length > 0 && filterHomeBanner.length === 1 && filterHomeBanner[0].buttons ? filterHomeBanner[0].buttons[0].name : '';
  const filterHomeBannerNameType = filterHomeBanner.length > 0 && filterHomeBanner.length === 1 && filterHomeBanner[0].buttons ? filterHomeBanner[0].buttons[0].type : '';

  // TODO: Reemplazar DataFake
  const slidesNew = [
    {
      img: 'https://picsum.photos/id/0/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
    {
      img: 'https://picsum.photos/id/1/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
    {
      img: 'https://picsum.photos/id/1031/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
    {
      img: 'https://picsum.photos/id/1066/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
    {
      img: 'https://picsum.photos/id/1078/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
    {
      img: 'https://picsum.photos/id/1079/370/240',
      title: 'tenetur magnam illo',
      description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
      linkText: 'Conoce más',
      route: '/apis',
    },
  ];

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ paddingTop: '114px' }}>
      {Object.keys(data).length > 0 ? (
        <div>
          {/* Slider */}
          <section>
            <Slider slides={slides} />
          </section>
          <div className={classes.svg__texture}>
            <img src={textureCircles} alt='Texture' />
          </div>
          {/* Beneficios principales */}
          <section className={`container ${classes.section__content}`}>
            <div className='row'>
              <div className={`flex-md-12 ${classes.section__content__title}`}>
                <h1 className='h2 text__primary font-weight-bold mb-10 ml-5'>
                  {titleSection || 'Benificios principales'}
                </h1>
              </div>
              <div className={`flex-md-5 flex-lg-5 flex-sm-12 ${classes.section__content__img}`}>
                <img src={backgroundSection || 'https://picsum.photos/500/300'} alt='Benefits' className='ml-4' />
              </div>
              <div className={`flex-md-12 flex-md-7 flex-lg-7 flex-sm-12 ${classes.section__content__items}`}>
                {itemsSection.map((item, i) => (
                  <Item
                    key={i}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    iconColor='#0033A0'
                    background='#ECF0F1'
                    textColor='#53565A'
                  />
                ))}
              </div>
            </div>
          </section>
          {/* Como funciona */}
          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text__secondary__white mb-5 ${classes.section__works__title}`}>
                    {filterWorks[0].title ? filterWorks[0].title : '¿Cómo funciona?'}
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {
                  filterDiscoverTab.map((item, i) => (
                    <div label={item.title} key={i} preIcon={item.smallText}>
                      <div className='row'>
                        {item.Products.map((data, x) => (
                          <div key={x} className='flex-lg-4 flex-md-12 flex-sm-12 py-6'>
                            <Item
                              number={data.num}
                              title={data.title}
                              description={data.subtitle}
                              icon={data.iconText}
                              type='title'
                              textColor='#ECF0F1'
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
                  filterButtonSection[0].header.map((button, i) => (
                    <div key={i} className='mb-4'>
                      {button.isKeywordInverted ? (
                        <HashLink smooth to='/apis#apiHome'>
                          <Button styles={button.keyword}>
                            {button.title}
                          </Button>

                        </HashLink>
                      ) : (
                        <HashLink smooth to='/#data'>
                          <Button styles={button.keyword}>
                            {button.title}
                          </Button>
                        </HashLink>
                      )}

                    </div>
                  ))
                ) : (null)}
              </div>
            </div>
          </section>

          <div className={`d-xs-none ${classes.section__discover__texture}`}>
            <img src={textureCirclesAlt} alt='' />
          </div>
          {/* Descubre nuestras APis */}
          <section className={`container ${classes.section__discover__sc}`}>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <h1 className={`h2 text__primary font-weight-bold ${classes.section__discover__title}`}>
                  {filterDiscoverTitle || 'Descubre nuestras APIs'}
                </h1>
              </div>
            </div>
            <div className='row d-xs-none'>
              <div className='flex-md-12 flex-sm-12'>
                <p className={`subtitle-1 mb-10 text__gray__gray_lighten-4 ${classes.section__discover__subtitle}`}>
                  {filterDiscoverSubtitle || ''}
                </p>
              </div>
            </div>
            <div className='row d-xs-none'>
              {
                filterDiscover && filterDiscover[0].useCaseList && filterDiscover[0].useCaseList.length > 0 ? (
                  filterDiscover[0].useCaseList.map((card, i) => (
                    <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                      <CardBasic chipTitle={card.statusText} title={card.title} description={card.description} info={card.linkText} route={handleOpenModal} />
                    </div>
                  ))
                ) : (null)
              }
            </div>
            <div className='container d-xs-only'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Slick slides={filterDiscover[0].useCaseList} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                  <HashLink smooth to='/apis#apiHome' className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                    <span className='mr-1'>ver todas</span>
                    <Icon id='MdOutlineEast' />
                  </HashLink>
                  <HashLink smooth to='/apis#apiHome' className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                    Ver todas
                  </HashLink>
                </div>
              </div>
            </div>
          </section>
          {/* Nuestras Experiencias */}
          <section className={classes.section__experiences}>
            <div className='container'>
              <div className={classes.section__experiences__title}>
                <h1 className='h2 text__primary mb-2'>
                  {filterWorks[1].title ? filterWorks[1].title : 'Nuestras experiencias'}
                </h1>
              </div>
              <div className={`d-xs-none ${classes.section__experiences__subtitle}`}>
                <p className='body-1'>
                  {filterWorks[1].subtitle ? filterWorks[1].subtitle : ''}
                </p>
              </div>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Tabs line={true}>
                    {
                      filterTabCard && filterTabCard.length > 0 ? (
                        filterTabCard.map((tab, i) => (
                          <div key={i} label={tab.name}>
                            <div className='row'>
                              <div className='flex-md-12 flex-sm-12'>
                                <div className={classes.section__experiences__content}>
                                  <div className={classes.section__experiences__content__img}>
                                    <div className={classes.section__experiences__content__img__overlay}>
                                      <img src={tab.img.length > 0 ? tab.img[0].url : 'https://picsum.photos/505/386'} alt='' />
                                    </div>
                                  </div>
                                  <div className={`d-xs-none ${classes.section__experiences__content__card}`}>
                                    <CardSlider lists={tab.cards.length > 0 ? tab.cards : []} />
                                  </div>
                                  <div className='container d-xs-only'>
                                    <div className='row'>
                                      <div className='flex-md-12 flex-sm-12'>
                                        <Slick slides={tab.cards.length > 0 ? tab.cards : []} tabCard={true} footerTabCard={tab.cards[i]} />
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
          </section>
          {/* Integra */}
          <section id='Banner'>
            <BannerCentered
              title={filterHomeBannerTitle !== '' ? filterHomeBannerTitle : 'Integras tus sistemas con las APIs de SURA'}
              subtitle={filterHomeBannerSubtitle !== '' ? filterHomeBannerSubtitle : 'Quisque rutrum. Sed augue ipsum.'}
              img={filterHomeBannerImage !== '' ? filterHomeBannerImage : 'https://picsum.photos/1920/300'}
              buttonType='primary'
              buttonLabel={filterHomeBannerNameButtom !== '' ? filterHomeBannerNameButtom : 'empezar ahora'}
              redirect={filterHomeBannerNameType}
            />
          </section>

          <section className={classes.section__news}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__primary'>{filterWorks[2].title ? filterWorks[2].title : 'Novedades'}</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>{filterWorks[2].subtitle ? filterWorks[2].subtitle : ''}</p>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <Slick slides={slidesNew} setIsOpen={setIsOpen} />
                </div>
              </div>
            </div>
            <div className={`container ${classes.section__news__showmore}`}>
              <div className='row justify-center'>
                <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center'>
                  <HashLink smooth to='/apis#apiHome'>
                    <div>Ver Más</div>
                  </HashLink>
                </div>
              </div>
            </div>
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

