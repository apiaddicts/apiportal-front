import React from 'react';
import Slider from '../components/Slider/Slider';
import Item from '../components/Item/Item';
import classes from '../styles/pages/home.module.scss';
import Icon from '../components/MdIcon/Icon';
import CardBasic from '../components/Card/CardBasic';
import BannerCentered from '../components/Banner/BannerCentered';
import Tabs from '../components/Tabs/Tabs';
import Button from '../components/Buttons/Button';
import Carousel from '../components/Carousel/Carousel';

function Home() {

  const slides = [
    {
      imgSrc: 'https://picsum.photos/1920/630',
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
      title: 'Magnam libero voluptatibus.',
      actionButtons: [
        {
          label: 'est',
          type: 'primary',
        },
        {
          label: 'recusandae error',
          type: 'ghost',
        },
      ],
    },
  ];

  const items = [
    { icon: 'MdWebAsset', title: 'Integración ágil y dinámica', description: 'Reduce los tiempos de integración y empieza a vender y gestionar de forma rápida y fácil.' },
    { icon: 'MdOutlineInbox', title: 'Amplio catálogo de soluciones y APIs', description: 'Podrás gestionar todo tipo de operaciones de negocio a través de tu cuenta y apps.' },
    { icon: 'MdOutlineDescription', title: 'Recursos y documentación developers', description: 'Ten siempre disponible toda la documetación de tus APIs y apóyate en las guías elaboradas para ti.' },
  ];

  const itemsWorks = [
    { number: 1, icon: 'MdPersonOutline', title: 'Regístrate', description: 'Crea una cuenta para tu organización y accede al catálogo complementos de APIs de SURA' },
    { number: 2, icon: 'MdOutlineDescription', title: 'Personaliza', description: 'Selecciona las APIs que mejor se ajustan a tus necesidades y descubre todo lo que puedes conseguir con ellas.' },
    { number: 3, icon: 'MdOutlineDescription', title: 'Desarrolla', description: 'En breve tendrás integradas las APIs en tu plataforma para comenzar a vender y gestionar los productos.' },
    { number: 4, icon: 'MdPersonOutline', title: 'perferendis', description: 'Sed tempore nisi veritatis asperiores pariatur est veritatis dicta.Sed tempore nisi veritatis asperiores pariatur est veritatis dicta.' },
    { number: 5, icon: 'MdOutlineDescription', title: 'perferendis', description: 'Doloribus voluptate voluptate.Doloribus voluptate voluptate.Doloribus voluptate voluptate.Doloribus voluptate voluptate.' },
    { number: 6, icon: 'MdOutlineDescription', title: 'perferendis', description: 'Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.Et et nihil dicta placeat.' },
  ];

  const itemsWorksAdmin = [
    { number: 1, icon: 'MdPersonOutline', title: 'Regístrate', description: 'Crea una cuenta para tu organización y accede al catálogo complementos de APIs de SURA' },
    { number: 2, icon: 'MdOutlineDescription', title: 'Personaliza', description: 'Selecciona las APIs que mejor se ajustan a tus necesidades y descubre todo lo que puedes conseguir con ellas.' },
    { number: 3, icon: 'MdOutlineDescription', title: 'Desarrolla', description: 'En breve tendrás integradas las APIs en tu plataforma para comenzar a vender y gestionar los productos.' },
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

  return (
    <div>
      <section>
        <Slider slides={slides} />
      </section>
      <section className={`container h-screen ${classes.content}`}>
        <div className={classes.section__content}>
          <div className={classes.section__content__title}>
            <h1 className='h2 text__primary font-weight-bold mb-10 ml-5'>Benificios principales</h1>
          </div>
          <div className={classes.section__content__img}>
            <img src='https://picsum.photos/500/300' alt='Benefits' className='ml-10' />
          </div>
          <div className={classes.section__content__items}>
            {items.map((item) => (
              <Item title={item.title} description={item.description} icon={item.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className={`h-screen ${classes.section__works}`}>
        <div className={`container ${classes.section__works__content}`}>
          <h1 className='h3 text__secondary__white mb-5'>¿Cómo funciona?</h1>
          <Tabs>
            <div label='Administrador'>
              <div className={classes.section__works__items}>
                {itemsWorksAdmin.map((item) => (
                  <div className={`mb-6 ${classes.section__works__items__item}`}>
                    <Item number={item.number} title={item.title} description={item.description} icon={item.icon} type='title' />
                  </div>
                ))}
              </div>
            </div>
            <div label='Desarrollador'>
              <div className={classes.section__works__items}>
                {itemsWorks.map((item) => (
                  <div className={`mb-6 ${classes.section__works__items__item}`}>
                    <Item number={item.number} title={item.title} description={item.description} icon={item.icon} type='title' />
                  </div>
                ))}
              </div>
            </div>
          </Tabs>
          <div className='button__group mt-10'>
            {buttons.map((button) => (
              <div className='pr-2'>
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
              cardsApis.map((card) => (
                <div className={classes.section__discover__apicards__card}>
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
            <h1 className='h2 text__primary'>Nuestras experiencias</h1>
          </div>
          <div className={classes.section__experiences__subtitle}>
            <p className='body-1'>Podemos adaptar nuestras APIs a tu sector y organicación. A continuación te mostramos algunos de nuestros casos de uso actuales.</p>
          </div>
          <div className={classes.section__experiences__tabs}>
            <Tabs>
              <div label='Lorem'>
                <h1>Lorem, ipsum.</h1>
              </div>
              <div label='Lorem, ipsum..'>
                <h1>Lorem, ipsum.</h1>
              </div>
              <div label='Lorem, fart '>
                <h1>Lorem, ipsum.</h1>
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
          <div className={classes.section__news__subtitle}>
            <p className='body-1'>Conoce todas las novedades sobre tecnología, APIs y transformación digital</p>
          </div>
          <Carousel />
        </div>
      </section>
    </div>

  );
}

export default Home;
