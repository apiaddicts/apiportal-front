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

import { getHome } from '../redux/actions/homeAction';

function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.demo);

  useEffect(() => {
    if (data && Object.keys(data).length === 0) {
      dispatch(getHome());
    }
  }, []);

  const items = [
    { icon: 'successWindow', title: 'Integración ágil y dinámica', description: 'Reduce los tiempos de integración y empieza a vender y gestionar de forma rápida y fácil.' },
    { icon: 'archivist', title: 'Amplio catálogo de soluciones y APIs', description: 'Podrás gestionar todo tipo de operaciones de negocio a través de tu cuenta y apps.' },
    { icon: 'note1', title: 'Recursos y documentación developers', description: 'Ten siempre disponible toda la documetación de tus APIs y apóyate en las guías elaboradas para ti.' },
  ];

  const itemsWorks = [
    { number: 1, icon: 'person', title: 'Regístrate', description: 'Crea una cuenta para tu organización y accede al catálogo complementos de APIs de SURA' },
    { number: 2, icon: 'note', title: 'Personaliza', description: 'Selecciona las APIs que mejor se ajustan a tus necesidades y descubre todo lo que puedes conseguir con ellas.' },
    { number: 3, icon: 'computer', title: 'Desarrolla', description: 'En breve tendrás integradas las APIs en tu plataforma para comenzar a vender y gestionar los productos.' },
    { number: 4, icon: 'person', title: 'perferendis', description: 'Sed tempore nisi veritatis asperiores pariatur est veritatis dicta.Sed tempore nisi veritatis asperiores pariatur est veritatis dicta.' },
    { number: 5, icon: 'note', title: 'perferendis', description: 'Doloribus voluptate voluptate.Doloribus voluptate voluptate.Doloribus voluptate voluptate.Doloribus voluptate voluptate.' },
    { number: 6, icon: 'computer', title: 'perferendis', description: 'Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.' },
  ];

  const itemsWorksAdmin = [
    { number: 1, icon: 'person', title: 'Regístrate', description: 'Crea una cuenta para tu organización y accede al catálogo complementos de APIs de SURA' },
    { number: 2, icon: 'note', title: 'Personaliza', description: 'Selecciona las APIs que mejor se ajustan a tus necesidades y descubre todo lo que puedes conseguir con ellas.' },
    { number: 3, icon: 'computer', title: 'Desarrolla', description: 'En breve tendrás integradas las APIs en tu plataforma para comenzar a vender y gestionar los productos.' },
  ];

  const cardsApis = [
    { chipTitle: 'GET' },
    { chipTitle: 'POST' },
    { chipTitle: 'GET' },
  ];

  const buttons = [
    { class: 'primary', label: 'empezar ahora' },
    { class: 'ghost', label: 'ver apis' },
  ];

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

  const slidesDemo = [
    {
      imgSrc: 'https://picsum.photos/1925/630',
      title: '¡Toda la potencia de una aseguradora en APIs!',
      actionButtons: [
        {
          label: 'Empezar ahora',
          type: 'primary',
        },
        {
          label: 'Ver APIS',
          type: 'ghost',
        },
      ],
    },
    {
      imgSrc: 'https://picsum.photos/1920/630',
      title: '¡SURA la mejor financiera que existe!',
      actionButtons: [
        {
          label: 'Empezar ahora',
          type: 'primary',
        },
        {
          label: 'Ver APIS',
          type: 'ghost',
        },
      ],
    },
    {
      imgSrc: 'https://picsum.photos/1923/630',
      title: '¡El mejor lugar de apis APIs!',
      actionButtons: [
        {
          label: 'Empezar ahora',
          type: 'primary',
        },
        {
          label: 'Ver APIS',
          type: 'ghost',
        },
      ],
    },
  ];

  // const filterSlider = data && data.contentSections ? data.contentSections.filter((item) => item.__component === 'sura.carousel') : [];
  // const slides = filterSlider.length > 0 ? filterSlider[0].slider.map((i) => {

  //   const response = {
  //     imgSrc: i.banner ? i.banner[0].url : 'https://picsum.photos/1920/630',
  //     title: i.title,
  //     actionButtons: i.actionButtons,
  //   };
  //   return response;
  // }) : [];
  return (
    <div>
      {Object.keys(data).length > 0 ? (
        <div>
          <section>
            <Slider slides={slidesDemo} />
          </section>
          <section className={`container ${classes.content}`}>
            <div className={classes.section__content}>
              <div className={classes.section__content__title}>
                <h1 className='h2 text__primary font-weight-bold mb-10 ml-5'>Benificios principales</h1>
              </div>
              <div className={classes.section__content__img}>
                <img src='https://picsum.photos/500/300' alt='Benefits' className='ml-10' />
              </div>
              <div className={classes.section__content__items}>
                {items.map((item, i) => (
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
            <div className={`container ${classes.section__works__content}`}>
              <h1 className='h3 text__secondary__white mb-5'>¿Cómo funciona?</h1>
              <Tabs direction='center' colorTab='white' activeColor='yellow'>
                <div label='Administrador'>
                  <div className={classes.section__works__items}>
                    {itemsWorksAdmin.map((item, i) => (
                      <div key={i} className={`mb-6 ${classes.section__works__items__item}`}>
                        <Item
                          number={item.number}
                          title={item.title}
                          description={item.description}
                          icon={item.icon}
                          type='title'
                          textColor='#d4d9db'
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div label='Desarrollador'>
                  <div className={classes.section__works__items}>
                    {itemsWorks.map((item, i) => (
                      <div key={i} className={`mb-6 ${classes.section__works__items__item}`}>
                        <Item
                          number={item.number}
                          title={item.title}
                          description={item.description}
                          icon={item.icon}
                          type='title'
                          textColor='#d4d9db'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs>
              <div className='button__group mt-10'>
                {buttons.map((button, i) => (
                  <div key={i} className='pr-2'>
                    <Button type={button.class}>
                      {button.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className='container pt-10 mt-10 mb-10 pb-10'>
            <div className={classes.section__discover}>
              <div className={classes.section__discover__title}>
                <h1 className='h2 text__primary font-weight-bold mb-2 ml-1'>Descubre nuestras APIs</h1>
              </div>
              <div className={classes.section__discover__subtitle}>
                <p className='subtitle-1 ml-1 mb-10'>
                  Encuentra las mejores APIs para tu negocio.
                  Nuestras APIs son fáciles de personalizar e integrar, para comenzar a vender y gestionar los productos.
                </p>
              </div>
              <div className={classes.section__discover__apicards}>
                {
                  cardsApis.map((card, i) => (
                    <div key={i} className={classes.section__discover__apicards__card}>
                      <CardBasic chipTitle={card.chipTitle} />
                    </div>
                  ))
                }
              </div>
              <div className={`mt-10 ${classes.section__discover__showmore}`}>
                <a href='' className={`button text__primary ${classes.section__discover__showmore__button}`}>
                  <span className='mr-1'>ver todas</span>
                  <Icon id='MdOutlineEast' />
                </a>
              </div>

            </div>
          </section>

          <section className={classes.section__experiences}>
            <div className='container pt-10 mt-10 pb-10 mb-10'>
              <div className={classes.section__experiences__title}>
                <h1 className='h2 text__primary mb-2'>Nuestras experiencias</h1>
              </div>
              <div className={classes.section__experiences__subtitle}>
                <p className='body-1'>Podemos adaptar nuestras APIs a tu sector y organicación. A continuación te mostramos algunos de nuestros casos de uso actuales.</p>
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

