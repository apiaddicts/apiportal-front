import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerCentered from '../components/Banner/BannerCentered';
import Button from '../components/Buttons/Button';
import CardBasic from '../components/Card/CardBasic';
import Carousel from '../components/Carousel/Carousel';
import Item from '../components/Item/Item';
import Tabs from '../components/Tabs/Tabs';
import classes from '../styles/pages/home.module.scss';
import { getHome } from '../redux/actions/homeAction';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import textureCircles from '../static/img/texture_circles.svg';
import codeSnipet from '../static/img/code-snippet.png';
import BannerImage from '../components/Banner/BannerImage';

function ApiDetails() {

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.demo);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      dispatch(getHome());
    }
  }, []);

  const filterSection = data && data.contentSections ? data.contentSections.filter((item) => item.__component === 'home.work-section') : [];
  // const backgroundSection = filterSection.length > 0 && filterSection.length === 1 && filterSection[0].background ? filterSection[0].background.url : '';

  const itemsSection = filterSection.length > 0 && filterSection.length === 1 && filterSection[0].Steps ? filterSection[0].Steps.map((i) => {
    const response = {
      icon: i.number,
      title: i.title,
      description: i.subtitle,
    };
    return response;
  }) : [];

  // Load discover section
  const filterDiscoverTab = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.button-hero') : [];

  const filterDiscover = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.section-use-case') : [];
  return (
    <div>
      {Object.keys(data).length > 0 ? (
        <>
          <section>
            <BannerImage />
          </section>
          <section className={`container ${classes.section__content}`}>
            <div className={classes.section__content__texture}>
              <img src={textureCircles} alt='Texture' />
            </div>
            <div className='row'>
              <div className={`flex-md-12 ${classes.section__content__title}`}>
                <h1 className='h2 text__primary font-weight-bold mb-10 ml-5'>
                  Benificios principales
                </h1>
              </div>
              <div className={`flex-md-6 flex-sm-12 ${classes.section__content__img}`}>
                <img src={codeSnipet} alt='Benefits' className='w-full' />
              </div>
              <div className={`flex-lg-6 flex-sm-12 ${classes.section__content__items}`}>
                {itemsSection.map((item, i) => (
                  <Item
                    key={i}
                    title={item.title}
                    icon={item.icon}
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
                    ¿Cómo funciona?
                  </h1>
                </div>
              </div>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                {filterDiscoverTab.map((item, i) => (
                  <div label={item.title} key={i}>
                    <div className='row'>
                      {item.Products.map((data, x) => (
                        <div key={x} className='flex-lg-4 flex-md-12 flex-sm-12 py-6'>
                          <Item
                            number={data.num}
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
                ))}
              </Tabs>
              <div className='button__group mt-10 justify-center'>
                {filterButtonSection && filterButtonSection.length > 0 ? (
                  filterButtonSection[0].header.map((button, i) => (
                    <div key={i} className='pr-2 mb-4'>
                      <Button styles={button.keyword}>
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
                  Otras APIs que te pueden interesar
                </h1>
              </div>
            </div>
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <p className='subtitle-1 ml-1 mb-10'>
                  Encuentra las mejores APIs para tu negocio.
                  Nuestras APIs son fáciles de personalizar e integrar, para comenzar a vender y gestionar los productos.
                </p>
              </div>
            </div>
            <div className='row'>
              {
                filterDiscover && filterDiscover[0].useCaseList && filterDiscover[0].useCaseList.length > 0 ? (
                  filterDiscover[0].useCaseList.map((card, i) => (
                    <div key={i} className='flex-lg-4 flex-md-6 flex-sm-12 my-6'>
                      <CardBasic chipTitle={card.statusText} title={card.title} description={card.description} info={card.linkText} />
                    </div>
                  ))
                ) : (null)
              }
            </div>
          </section>
          <section id='Banner'>
            <BannerCentered
              title='Integras tus sistemas con las APIs de SURA'
              subtitle='Quisque rutrum. Sed augue ipsum.'
              img='https://picsum.photos/1920/300'
              buttonType='primary'
              buttonLabel='empezar ahora'
            />
          </section>
          <section className={`container ${classes.section__news}`}>
            <div className='my-10'>
              <div className={classes.section__news__title}>
                <h1 className='h2 text__primary'>Novedades</h1>
              </div>
              <div className='mb-15'>
                <p className='body-1 my-9'>
                  Conoce todas las novedades sobre tecnología, APIs y transformación digital
                </p>
              </div>
            </div>
            <div>
              <Carousel />
            </div>
          </section>

        </>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default ApiDetails;
