/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import Input from '../components/Input';
import imgBg from '../static/img/bg-01.png';
import stylesBlog from '../styles/pages/blog.module.scss';
import jsonData from '../data-fake.json';
import Carousel from '../components/Carousel/Carousel';
import classes from '../styles/pages/home.module.scss';
import Contact from '../components/Contact';
import Tabs from '../components/Tabs/Tabs';
import CardInformation from '../components/Card/CardInformation';
import Base from '../components/Card/Base';

const buttons = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Desarroladores' },
  { class: 'gray', label: 'Desarroladores' },
  { class: 'gray', label: 'Desarroladores' },
];
const buttonsTags = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Desarroladores' },
  { class: 'gray', label: 'Desarroladores' },
  { class: 'gray', label: 'Desarroladores' },
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
            <div label='Lorem'>
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
            <div label='Desarrolladores'>
              <h1>Hola mundo</h1>
            </div>
            <div label='APIs'>
              <h2>si</h2>
            </div>
            <div label='Empresas'>
              <h2>si</h2>
            </div>
            <div label='voluptas nulla dolorum'>
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
              resultsDa.map((result) => (
                <CardInformation
                  img={result.image}
                  description={result.description}
                  title={result['titl:e']}
                  buttons={buttonsTags}
                />
              ))
            )}
          </div>
        </div>
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
    </div>
  );
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
        <p className='subtitle-2 text-uppercase font-weight-bold text__gray__gray_darken mb-2'>Lo más reciente</p>
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

export default Blog;
