import React, { useEffect, useState } from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import stylesBlog from '../styles/pages/blog.module.scss';
import jsonData from '../data-fake.json';
import Carousel from '../components/Carousel/Carousel';
import classes from '../styles/pages/home.module.scss';
import Tabs from '../components/Tabs/Tabs';
import CardInformation from '../components/Card/CardInformation';
import Novedades from '../components/Novedades';
import useSearch from '../hooks/useSearch';

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
  const [resultsSearch, setResultsSearch] = useState([]);
  const { value, setValue, formik } = useSearch({
    initialState: {
      search: '',
    },
  });

  const results = jsonData.filter((item) => {
    return formik.values.search === '' ? null : item.description.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    setValue(formik.values.search);

    console.log(results.length === 0 ? 'Sin resultados' : results);
    setResultsSearch(results);
  }, [formik.values.search]);

  return (
    <div>
      <section>
        <BannerStatic
          title='Descubre las novedades de SURA'
          img='https://picsum.photos/1920/300'
          isSearch
          onChange={formik.handleChange}
          value={formik.values.search}
        />
      </section>
      {
        resultsSearch.length === 0 && formik.values.search === '' ? (
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
                  <div className={stylesBlog.section__result__content}>
                    <div className={stylesBlog.section__result__content__result}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridGap: '1rem',
                      }}
                      >
                        {jsonData.length === 0 ? (
                          <p>Sin Resltados</p>
                        ) : (
                          jsonData.map((result, index) => (
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
                </div>
                <div label='Novedades'>
                  <h1>Todo sobre Novedades</h1>
                </div>
                <div label='Desarrolladores'>
                  <h2>Todo sobre Desarrolladores</h2>
                </div>
                <div label='APIs'>
                  <h2>Todo sobre APIs</h2>
                </div>
                <div label='Empresas'>
                  <h2>Todo sobre Empresas</h2>
                </div>
              </Tabs>
            </div>
          </section>
        ) : (
          <section className='container py-10'>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridGap: '1rem',
            }}
            >
              {resultsSearch.length === 0 ? (
                <p>Sin Resltados</p>
              ) : (
                resultsSearch.map((result, index) => (
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
          </section>
        )

      }

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

export default Blog;
