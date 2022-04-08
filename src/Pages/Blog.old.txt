import React, { useState } from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import Button from '../components/Buttons/Button';
import Base from '../components/Card/Base';
import Input from '../components/Input';
import imgBg from '../static/img/bg-01.png';
import stylesBlog from '../styles/pages/blog.module.scss';
import jsonData from '../data-fake.json';
import Carousel from '../components/Carousel/Carousel';
import classes from '../styles/pages/home.module.scss';
import Contact from '../components/Contact';
import Tabs from '../components/Tabs/Tabs';
import Chip from '../components/Chip/Chip';

const buttons = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Desarroladores' },
];

function Blog() {

  return (
    <>
      <section>
        <BannerStatic
          title='Descrubre las novedades de SURA'
          img={imgBg}
        />
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        >
          <div style={{
            display: 'flex',
            width: '50%',
            transform: 'translate(50%, -50%)',
            position: 'absolute',
            top: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <div style={{
              width: '25px',
              position: 'absolute',
              right: '15px',
            }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <div style={{
              width: '100%',
            }}
            >
              <Input type='text' placeholder='Buscar...' />
            </div>
          </div>
        </div>
      </section>

      {/* Nav Categories */}
      <div style={{
        width: '80%',
        margin: '0 auto',
      }}
      >
        <div className={classes.section__experiences__tabs}>
          <Tabs>
            <div label='Lorem'>
              <div className={stylesBlog.section__experiences__content}>
                <div className={stylesBlog.section__experiences__content__img}>
                  <div className={stylesBlog.section__experiences__content__img__overlay}>
                    <img src='https://picsum.photos/500/350' alt='' />
                  </div>
                </div>
                <div className={stylesBlog.section__experiences__content__card}>
                  <div className={stylesBlog.section__experiences__content__items}>
                    <p className='h5 text__primary w-full'>Conoce nuestras APIs de auto flexible</p>
                    <div style={{
                      display: 'flex',
                    }}
                    >
                      {buttons.map((button) => (
                        <div className='py-2 mr-2'>
                          <Chip title={button.label} className={button.class} />
                        </div>
                      ))}
                    </div>
                    <p>
                      Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.
                      Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enim.
                    </p>
                  </div>
                </div>
              </div>
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
      <div style={{
        width: '80%',
        margin: 'auto',
        display: 'flex',
      }}
      >
        <ResultCard />
        <Novedades />
      </div>
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
      <Contact />
    </>
  );
}
export default Blog;

function ResultCard() {
  // eslint-disable-next-line no-unused-vars
  const [resultsDa, setResultsDa] = useState(jsonData);

  return (
    resultsDa.length === 0 ?
      <p>No hay resultados</p> :
      (
        <div style={{
          width: '60%',
          padding: '2rem 0',
        }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '1rem',
          }}
          >
            {resultsDa.map((result, index) => (
              <div style={{
                width: '100%',
              }}
              >
                <Base style={{
                  padding: '30px',
                }}
                >
                  <div
                    style={{
                      width: '100%',
                      position: 'relative',
                      backgroundImage: `url(${result.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      height: '200px',
                      overflow: 'hidden',
                    }}
                  />
                  <div style={{
                    padding: '25px',
                  }}
                  >
                    <p className='h5 text__primary'>{result.title}</p>
                    <div style={{
                      display: 'flex',
                    }}
                    >
                      {buttons.map((button) => (
                        <div className='py-2 mr-2'>
                          <Button type={button.class}>
                            {button.label}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p>{result.description}</p>
                  </div>
                </Base>
              </div>
            ))}
          </div>
        </div>

      ));
}

function Novedades() {
  // eslint-disable-next-line no-unused-vars
  const [resultsDa, setResultsDa] = useState(jsonData);
  return (
    <div style={{
      width: '40%',
      padding: '02rem',
    }}
    >
      <div style={{
        width: '100%',
      }}
      >
        <p className='h5 text__primary'>Lo más reciente</p>
      </div>
      {
        resultsDa.length === 0 ?
          <p>No hay resultados</p> :
          resultsDa.map((result, index) => (
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '1px solid #ccc',
            }}
            >
              <div style={{
                width: '100px',
                borderRadius: '100%',
                padding: '10px',
              }}
              >
                <img
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '100%',
                  }}
                  src={result.image}
                  alt=''
                />
              </div>
              <div style={{
                width: '100%',
                padding: '0 1rem',
              }}
              >
                <p className='text__primary'>{result['titl:e']}</p>
                <p>{result.description}</p>
              </div>
            </div>
          ))
      }
    </div>
  );
}
