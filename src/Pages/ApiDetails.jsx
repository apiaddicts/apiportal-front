import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BannerCentered from '../components/Banner/BannerCentered';
import Button from '../components/Buttons/Button';
import CardBasic from '../components/Card/CardBasic';
import Item from '../components/Item/Item';
import Tabs from '../components/Tabs/Tabs';
import classes from '../styles/pages/home.module.scss';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import textureCircles from '../static/img/texture_circles.svg';
import codeSnipet from '../static/img/code-snippet.png';
import BannerImage from '../components/Banner/BannerImage';
import Slick from '../components/SlickSlider/Slick';

import { getHome } from '../redux/actions/homeAction';
import { getLibrary, resetGetLibrary } from '../redux/actions/libraryAction';
import Icon from '../components/MdIcon/Icon';

const slidesNew = [
  {
    img: 'https://picsum.photos/id/0/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1031/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1066/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1078/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1079/370/240',
    title: 'tenetur magnam illo',
    description: 'Eum eum laudantium sed consequatur sit. Sit sit aut eum omnis. Aut sit ut veritatis non omnis et temporibus iste. Error ut magnam eius nostrum nesciunt qui asperiores mollitia. Ut distinctio autem eos sit quia tempora accusamus similique. Aut iusto est hic eum dolores.',
    linkText: 'Conoce más',
  },
];

function ApiDetails({ setIsOpen }) {

  const dispatch = useDispatch();
  const params = useParams();
  const { data } = useSelector((state) => state.demo);
  const { library } = useSelector((state) => state.library);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      dispatch(getHome());
    }

    if (params.id && library && Object.keys(library).length === 0) {
      dispatch(getLibrary(params.id));
    }

    return () => {
      dispatch(resetGetLibrary());
    };
  }, []);

  // Load discover section
  const filterDiscoverTab = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'home.discover-section') : [];

  // Load buttons sections
  const filterButtonSection = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.button-hero') : [];

  const filterDiscover = data && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sections.section-use-case') : [];

  const buttonsLbls = library && library.buttons && library.buttons.length > 0 ? library.buttons.map((item) => {
    const data = {
      label: item.name,
      class: item.class,
    };

    return data;
  }) : [
    {
      label: 'Probar API',
      class: 'primary',
    },
    {
      label: 'Documentación',
      class: 'ghost-variant',
    },
  ];

  return (
    <div>
      {Object.keys(data).length > 0 && Object.keys(library).length > 0 ? (
        <>
          <section>
            <BannerImage
              title={library.title}
              img={library.image.length > 0 && library.image.length === 1 ? library.image[0].url : ''}
              buttons={buttonsLbls}
              setIsOpen={setIsOpen}
              description='In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc dignissim eu. '
            />
          </section>
          <section className={`container ${classes.section__content} pb-9`}>
            <div className={classes.section__content__texture}>
              <img src={textureCircles} alt='Texture' />
            </div>
          </section>
          <section className='container mb-18'>
            <div className='row'>
              <div className={`flex-md-12 flex-sm-12 -ml-23 ${classes.section__content__title}`}>
                <h1 className='h2 text__primary font-weight-bold mb-10 -ml-23 text-center-sm'>
                  {library.benefits && library.benefits.length > 0 && library.benefits.length === 1 ?
                    library.benefits[0].title :
                    'Benificios principales'}
                </h1>
              </div>
              <div className='row px-5'>
                <div className={`flex-sm-12 flex-md-6 flex-lg-6 ${classes.section__content__img}`}>
                  <img src={library.benefits && library.benefits.length > 0 && library.benefits.length === 1 && library.benefits[0].background ? library.benefits[0].background.url : codeSnipet} alt='Benefits' className='w-full' />
                </div>
                <div className='flex-sm-12 flex-md-6 flex-lg-6 container' style={{ display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignContent: 'center' }}>
                    {library.benefits && library.benefits.length > 0 && library.benefits.length === 1 && library.benefits[0].Steps.length > 0 ? (
                      library.benefits[0].Steps.map((item, i) => (
                        <div>
                          <Item
                            key={i}
                            title={item.title}
                            icon={item.number}
                            titleStyles={{ fontSize: '19px', fontWeight: '600' }}
                            iconStyle={{ width: '50px', height: '50px' }}
                          />
                        </div>
                      ))

                    ) : (null)}
                  </div>
                </div>
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
                    <div key={i} className='pr-10 mb-4'>
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
                <p className={`subtitle-1 mb-10 text__gray__gray_lighten-4 ${classes.section__discover__subtitle}`}>
                  Encuentra las mejores APIs para tu negocio.
                  {' '}
                  <br />
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
            <div className='row'>
              <div className='flex-md-12 flex-sm-12'>
                <div className={`mt-10 mr-6 ${classes.section__discover__showmore}`}>
                  <a href='' className={`button text__primary d-xs-none ${classes.section__discover__showmore__button}`}>
                    <span className='mr-1'>ver todas</span>
                    <Icon id='MdOutlineEast' />
                  </a>
                  <a href='' className={`d-sm-none ${classes.section__discover__showmore__button}`}>
                    Ver todas
                  </a>
                </div>
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
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__primary'>Novedades</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>
                    Conoce todas las novedades sobre tecnología, APIs y transformación digital
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
            <div className={`container ${classes.section__news__showmore}`}>
              <div className='row justify-center'>
                <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center mt-8'>
                  <a href=''>Ver más</a>
                </div>
              </div>
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
