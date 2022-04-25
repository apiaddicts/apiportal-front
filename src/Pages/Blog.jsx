import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import stylesBlog from '../styles/pages/blog.module.scss';
import classes from '../styles/pages/home.module.scss';
import jsonData from '../data-fake.json';

import BannerStatic from '../components/Banner/BannerStatic';
import Carousel from '../components/Carousel/Carousel';
import Tabs from '../components/Tabs/Tabs';
import CardInformation from '../components/Card/CardInformation';
import Novedades from '../components/Novedades';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';

import useSearch from '../hooks/useSearch';
import Icon from '../components/MdIcon/Icon';
import { getBlogs } from '../redux/actions/blogAction';

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
  const dispatch = useDispatch();
  const { value, setValue, formik } = useSearch({
    initialState: {
      search: '',
    },
  });
  const { blogs } = useSelector((state) => state.blog);
  const id = Date.now();
  const results = jsonData.filter((item) => {
    return formik.values.search === '' ? null : item.description.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    setValue(formik.values.search);

    // console.log(results.length === 0 ? 'Sin resultados' : results);
    setResultsSearch(results);
  }, [formik.values.search]);

  useEffect(() => {
    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }
  });
  return (
    <div>
      {blogs.length > 0 ? (
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
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12'>
                    <Tabs line={true}>
                      <div label='Todos'>
                        <div className={`d-xs-none ${stylesBlog.section__experiences__content}`}>
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
                              {blogs.length === 0 ? (
                                <p>Sin Resultados</p>
                              ) : (
                                blogs.map((result, index) => (
                                  <Link to={`/blog/${result.id}`} key={index}>
                                    <CardInformation
                                      img={result.image ? result.image[0].url : ''}
                                      description={result.description}
                                      title={result.title}
                                      buttons={result.tags && result.tags.length > 0 ? result.tags : []}
                                    />
                                  </Link>
                                ))
                              )}
                            </div>
                            <div className={stylesBlog.section__result__content__pagination}>
                              <div className={stylesBlog.section__result__content__pagination__buttons__before}>
                                <Icon id='MdNavigateBefore' />
                                <p>Anterior</p>
                              </div>
                              <div className={stylesBlog.section__result__content__pagination__number}>
                                <p>01</p>
                                <p>02</p>
                                <p>...</p>
                                <p>10</p>
                              </div>
                              <div className={stylesBlog.section__result__content__pagination__buttons__next}>
                                <p>Siguente</p>
                                <Icon id='MdNavigateNext' />
                              </div>
                            </div>
                          </div>
                          <Novedades />
                        </div>
                      </div>
                      <div label='Novedades'>
                        <h1>Todo sobre Novedades</h1>
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
                        <h2>Todo sobre Desarrolladores</h2>
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
                      <div label='APIs'>
                        <h2>Todo sobre APIs</h2>
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
                      <div label='Empresas'>
                        <h2>Todo sobre Empresas</h2>
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
                    </Tabs>
                  </div>
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
                      <Link to={`/blog/${id}`} key={index}>
                        <CardInformation
                          img={result.image}
                          description={result.description}
                          title={result['titl:e']}
                          buttons={buttonsTags}
                        />
                      </Link>
                    ))
                  )}
                </div>
              </section>
            )

          }

          <section className={`container ${classes.section__news}`}>
            <div className='my-10'>
              <div className={classes.section__news__title}>
                <h1 className='h2 text__primary'>También te puede interesar</h1>
              </div>
              <div className='mb-15'>
                <p className='body-1 my-9'>Conoce todas las novedades sobre tecnología, APIs y transformación digital</p>
              </div>
            </div>
            <div>
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

export default Blog;
