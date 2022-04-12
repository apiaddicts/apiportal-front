import React, { useState } from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import stylesBlog from '../styles/pages/blog.module.scss';
import jsonData from '../data-fake.json';
import Carousel from '../components/Carousel/Carousel';
import classes from '../styles/pages/home.module.scss';
import Contact from '../components/Contact';
import Tabs from '../components/Tabs/Tabs';
import CardInformation from '../components/Card/CardInformation';

const buttons = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Empresas' },
  { class: 'gray', label: 'Desarroladores' },
];
const buttonsTags = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Empresas' },
  { class: 'gray', label: 'Desarroladores' },
];

function Blog() {
// eslint-disable-next-line no-unused-vars
  const [resultsDa, setResultsDa] = useState(jsonData);
  return (
    <div>
      <section>
        <BannerStatic title='Descubre las novedades de SURA' img='https://picsum.photos/1920/300' isSearch={true} />
      </section>
      <section className='container'>
        <div className={classes.section__experiences__tabs}>
          <Tabs line={true}>
            <div label='Todos'>
              <div className={stylesBlog.section__experiences__content}>
                <div className={stylesBlog.section__experiences__content__img}>
                  <div className={stylesBlog.section__experiences__content__img__overlay}>
                    <img src='https://picsum.photos/500/350' alt='' />
                  </div>
                </div>
                <div className={stylesBlog.section__experiences__content__card}>
                  <CardInformation buttons={buttons} reading='Lectura de 10 mints' />
                </div>
              </div>
            </div>
            <div label='Novedades'>
              <h1>Hola mundo</h1>
            </div>
            <div label='Desarrolladores'>
              <h2>si</h2>
            </div>
            <div label='APIs'>
              <h2>si</h2>
            </div>
            <div label='Empresas'>
              <h2>si</h2>
            </div>
          </Tabs>
        </div>
      </section>
      <div className={stylesBlog.section__result__content}>
        <div className={stylesBlog.section__result__content__result}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '1rem',
          }}
          >
            {resultsDa.length === 0 ? (
              <p>Sin Resltados</p>
            ) : (
              resultsDa.map((result, index) => (
                <CardInformation
                  key={index}
                  img={result.image}
                  description={result.description}
                  title={result['titl:e']}
                  buttons={buttonsTags}
                />
              ))
            )}
          </div>
          <div className={stylesBlog.section__result__content__pagination}>
            <p>Anterior</p>
            <p>01 02 ...10</p>
            <p>Siguiente</p>
          </div>
        </div>
        <Novedades />
      </div>
      <section className={classes.section__news}>
        <div className='container my-10'>
          <div className={classes.section__news__title}>
            <h1 className='h2 text__primary'>También te puede interesar</h1>
          </div>
          <div className='mb-10'>
            <p className='body-1 my-9'>Conoce todas las novedades sobre tecnología, APIs y transformación digital</p>
          </div>
          <Carousel />
        </div>
      </section>
    </div>
  );
}

function Novedades() {
  // eslint-disable-next-line no-unused-vars
  const [resultsDa, setResultsDa] = useState(jsonData);
  return (
    <div style={{
      width: '40%',
      padding: '0 2rem',
    }}
    >
      <div style={{
        width: '100%',
      }}
      >
        <p className='subtitle-2 mb-6 text-uppercase font-weight-bold text__gray__gray_darken mb-2'>Lo más reciente</p>
      </div>
      {
        resultsDa.length === 0 ?
          <p>No hay resultados</p> :
          resultsDa.map((result, index) => (
            <div
              key={index}
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
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
                <p className='text__primary pb-2'>Tu Salud - Lectura de 12 min.</p>
                <p className={`${stylesBlog.section__result__content__result__description} text__gray__gray_darken`}>{result.description}</p>
              </div>
            </div>
          ))
      }

      <Contact />
    </div>
  );
}

export default Blog;
