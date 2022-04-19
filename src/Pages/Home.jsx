import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../components/Item/Item';
import classes from '../styles/pages/home.module.scss';
import Icon from '../components/MdIcon/Icon';
import CardBasic from '../components/Card/CardBasic';
import CardSlider from '../components/Card/CardSlider';
import BannerCentered from '../components/Banner/BannerCentered';
import Tabs from '../components/Tabs/Tabs';
import Button from '../components/Buttons/Button';
import Carousel from '../components/Carousel/Carousel';
import Slider from '../components/Slider/Slider';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import textureCircles from '../static/img/texture_circles.svg';
import { getHome } from '../redux/actions/homeAction';

function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.demo);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      dispatch(getHome());
    }
  }, []);

  const cardSlides = [
    {
      title: 'Ejemplo 1',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'Md3DRotation',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Cargo',
    },
    {
      title: 'Ejemplo 2',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'MdAspectRatio',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Ejemplo',
    },
    {
      title: 'Ejemplo 3',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'MdContactless',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Desarrollo',
    },
  ];

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

  const filterTabCard = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sura.tab-card') : [];
  // console.log(data.contentSections);
  console.log(filterTabCard);
  // console.log(filterDiscoverSubtitle);
  return (
    <div>
      {Object.keys(data).length > 0 ? (
        <div>
          <section>
            <Slider slides={slides} />
          </section>

          <section className={`container ${classes.section__content}`}>
            <div className={classes.section__content__texture}>
              <img src={textureCircles} alt='Texture' />
            </div>
            <div className='row'>
              <div className={`flex-md-12 ${classes.section__content__title}`}>
                <h1 className='h2 text__primary font-weight-bold mb-10 ml-5'>
                  {titleSection || 'Benificios principales'}
                </h1>
              </div>
              <div className={`flex-md-6 flex-sm-12 ${classes.section__content__img}`}>
                <img src={backgroundSection || 'https://picsum.photos/500/300'} alt='Benefits' className='ml-4' />
              </div>
              <div className={`flex-lg-6 flex-sm-12 ${classes.section__content__items}`}>
                {itemsSection.map((item, i) => (
                  <Item
                    key={i}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    iconColor='#0033A0'
                    background='#ECF0F1
                  '
                  />
                ))}
              </div>
            </div>
          </section>

          <section className={`${classes.section__works}`}>
            <div className='container'>
              <div className='row'>
                <div className='flex-md-12 flex-sm-12'>
                  <h1 className={`h3 text-center text__secondary__white mb-5 ${classes.section__works__title}`}>
                    {filterWorks[0].title ? filterWorks[0].title : '¿Cómo funciona?'}
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {
                  filterDiscoverTab.map((item, i) => (
                    <div label={item.title} key={i}>
                      <div className={classes.section__works__items}>
                        {item.Products.map((data, x) => (
                          <div key={x} className={`mb-6 ${classes.section__works__items__item}`}>
                            <Item
                              number={data.id}
                              title={data.title}
                              description={data.subtitle}
                              icon={data.icon}
                              type='title'
                              textColor='#d4d9db'
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                }
              </Tabs>
              <div className='button__group mt-10'>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection[0].header.map((button, i) => (
                    <div key={i} className='pr-2 mb-4'>
                      <Button type={button.keyword}>
                        {button.title}
                      </Button>
                    </div>
                  ))
                ) : (null)}
              </div>
            </div>
          </section>

          <section className={`container ${classes.section__discover}`}>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <h1 className='h2 text__primary font-weight-bold mb-2 ml-1'>
                  {filterDiscoverTitle || 'Descubre nuestras APIs'}
                </h1>
              </div>
            </div>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <p className='subtitle-1 ml-1 mb-10'>
                  {filterDiscoverSubtitle || ''}
                </p>
              </div>
            </div>
            <div className='row'>
              {
                filterDiscover && filterDiscover[0].useCaseList && filterDiscover[0].useCaseList.length > 0 ? (
                  filterDiscover[0].useCaseList.map((card, i) => (
                    <div key={i} className={classes.section__discover__apicards__card}>
                      <CardBasic chipTitle={card.statusText} title={card.title} description={card.description} info={card.linkText} />
                    </div>
                  ))
                ) : (null)
              }
            </div>
            <div className='row'>
              <div className='flex-md-12'>
                <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                  <a href='' className={`button text__primary ${classes.section__discover__showmore__button}`}>
                    <span className='mr-1'>ver todas</span>
                    <Icon id='MdOutlineEast' />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={classes.section__experiences}>
            <div className='container pt-10 mt-10 pb-10 mb-10'>
              <div className={classes.section__experiences__title}>
                <h1 className='h2 text__primary mb-2'>
                  {filterWorks[1].title ? filterWorks[1].title : 'Nuestras experiencias'}
                </h1>
              </div>
              <div className={classes.section__experiences__subtitle}>
                <p className='body-1'>
                  {filterWorks[1].subtitle ? filterWorks[1].subtitle : ''}
                </p>
              </div>
              <div className={classes.section__experiences__tabs}>
                <Tabs line={true}>
                  <div label='Lorem ipsum'>
                    <div className={classes.section__experiences__content}>
                      <div className={classes.section__experiences__content__img}>
                        <div className={classes.section__experiences__content__img__overlay}>
                          <img src='https://picsum.photos/500/350' alt='' />
                        </div>
                      </div>
                      <div className={classes.section__experiences__content__card}>
                        <CardSlider lists={cardSlides} />
                      </div>
                    </div>
                  </div>
                  <div label='Lorem, ipsum..'>
                    <div className={classes.section__experiences__content}>
                      <div className={classes.section__experiences__content__img}>
                        <div className={classes.section__experiences__content__img__overlay}>
                          <img src='https://picsum.photos/500/350' alt='' />
                        </div>
                      </div>
                      <div className={classes.section__experiences__content__card}>
                        <CardSlider lists={cardSlides} />
                      </div>
                    </div>
                  </div>
                  <div label='Lorem, fart '>
                    <div className={classes.section__experiences__content}>
                      <div className={classes.section__experiences__content__img}>
                        <div className={classes.section__experiences__content__img__overlay}>
                          <img src='https://picsum.photos/500/350' alt='' />
                        </div>
                      </div>
                      <div className={classes.section__experiences__content__card}>
                        <CardSlider lists={cardSlides} />
                      </div>
                    </div>
                  </div>
                  <div label='Lorem, farts '>
                    <div className={classes.section__experiences__content}>
                      <div className={classes.section__experiences__content__img}>
                        <div className={classes.section__experiences__content__img__overlay}>
                          <img src='https://picsum.photos/500/350' alt='' />
                        </div>
                      </div>
                      <div className={classes.section__experiences__content__card}>
                        <CardSlider lists={cardSlides} />
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </section>

          <section id='Banner'>
            <BannerCentered
              title='Integra tus sistemas con las APIs de SURA'
              subtitle='Quisque rutrum. Sed augue ipsum.'
              img='https://picsum.photos/1920/300'
              buttonType='primary'
              buttonLabel='empezar ahora'
            />
          </section>

          <section className={classes.section__news}>
            <div className='container pt-10 mt-10 mb-10 pb-10'>
              <div className={classes.section__news__title}>
                <h1 className='h2 text__primary'>Novedades</h1>
              </div>
              <div className={`${classes.section__news} mb-10`}>
                <p className='body-1 my-10'>Conoce todas las novedades sobre tecnología, APIs y transformación digital</p>
              </div>
              <Carousel />
            </div>
          </section>
        </div>

      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
}

export default Home;

