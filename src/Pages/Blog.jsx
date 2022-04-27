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
import Contact from '../components/Contact';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';

import useSearch from '../hooks/useSearch';
import Icon from '../components/MdIcon/Icon';
import { getBlogData, getBlogs } from '../redux/actions/blogAction';

const buttonsTags = [
  { class: 'gray', label: 'APIS' },
  { class: 'gray', label: 'Empresas' },
  { class: 'gray', label: 'Desarroladores' },
];

function Blog() {
  const { blogs, data } = useSelector((state) => state.blog);
  const [resultsSearch, setResultsSearch] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [label, setLabel] = useState('');
  const [resultsData, setResultsData] = useState(blogs);
  const dispatch = useDispatch();
  const { value, setValue, formik } = useSearch({
    initialState: {
      search: '',
    },
  });
  const id = Date.now();
  const results = jsonData.filter((item) => {
    return formik.values.search === '' ? null : item.description.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    setValue(formik.values.search);
    setResultsSearch(results);
  }, [formik.values.search]);

  useEffect(() => {
    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    if (data && Object.keys(data).length === 0) {
      dispatch(getBlogData());
    }
  });

  // load slider
  const BannerFilter = Object.keys(data).length > 0 && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'home.banner-section') : [];
  const bannerTitle = BannerFilter.length > 0 && BannerFilter.length === 1 && BannerFilter[0].title ? BannerFilter[0].title : '';
  const bannerImage = BannerFilter.length > 0 && BannerFilter.length === 1 && BannerFilter[0].background ? BannerFilter[0].background.url : '';
  const bannerSearch = BannerFilter.length > 0 && BannerFilter.length === 1 && BannerFilter[0].search ? BannerFilter[0].search : '';

  const TabsFilter = Object.keys(data).length > 0 && data.contentSections && data.contentSections.length > 0 ? data.contentSections.filter((item) => item.__component === 'sura.tab-card') : [];

  const deTbas = (tab) => {
    const label = TabsFilter.find((label) => label.name.toLowerCase().includes(tab.toLowerCase()));
    if (label.tab.toLowerCase().includes('zero')) {
      setResultsData(blogs);
    } else {
      const results = blogs.filter((item) => {
        return item.tags.map((tag) => tag.tab.toLowerCase()).includes(label.tab.toLowerCase());
      });
      setResultsData(results);
    }

  };

  return (
    <div>
      {blogs.length > 0 && Object.keys(data).length > 0 ? (
        <div>
          <section>
            {
              bannerSearch !== '' ? (
                <BannerStatic
                  title={bannerTitle !== '' ? bannerTitle : 'Descubre las novedades de SURA'}
                  img={bannerImage !== '' ? bannerImage : 'https://picsum.photos/1920/300'}
                  isSearch
                  onChange={formik.handleChange}
                  value={formik.values.search}
                />
              ) : (null)
            }
          </section>
          {
            resultsSearch.length === 0 && formik.values.search === '' ? (
              <section className='container'>
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12 mt-9'>
                    <Tabs
                      line={true}
                      deTbas={deTbas}
                    >
                      {TabsFilter.length > 0 ? (
                        TabsFilter.map((tab, i) => (
                          <div label={tab.name} key={i}>
                            <div className={`d-xs-none ${stylesBlog.section__experiences__content}`}>
                              <div className={stylesBlog.section__experiences__content__img}>
                                <div className={stylesBlog.section__experiences__content__img__overlay}>
                                  <img src={tab.img && tab.img.length > 0 ? tab.img[0].url : 'https://picsum.photos/500/350'} alt='' />
                                </div>
                              </div>
                              <div className={stylesBlog.section__experiences__content__card}>
                                <CardInformation
                                  title={tab.cards && tab.cards[0].title}
                                  buttons={tab.cards && tab.cards[0].steps}
                                  description={tab.cards && tab.cards[0].description}
                                  reading={tab.cards && tab.cards[0].timeRead}
                                />
                              </div>
                            </div>

                            <div className={stylesBlog.apis__library}>
                              <div id='Cards' className={stylesBlog.apis__library__cards}>
                                {
                                  resultsData.length === 0 ? (
                                    <span>Sin resultados disponibles</span>
                                  ) : (
                                    resultsData.map((results, index) => (
                                      <Link to={`/blog/${results.id}`} key={index}>
                                        <CardInformation
                                          img={results.image ? results.image[0].url : ''}
                                          description={results.description}
                                          title={results.title}
                                          buttons={results.tags && results.tags.length > 0 ? results.tags : []}
                                        />
                                      </Link>
                                    ))
                                  )
                                }
                              </div>
                              <div id='Suggestions' className={`d-xs-none ${stylesBlog.apis__library__suggestions}`}>
                                <div className={stylesBlog.apis__library__suggestions__content}>
                                  <h1 className={stylesBlog.apis__library__suggestions__content__title}>Lo más reciente</h1>
                                  <Novedades />
                                </div>
                              </div>
                              <div id='Contact' className={stylesBlog.apis__library__contact}>
                                <Contact />
                              </div>
                              <div id='Footer' className={stylesBlog.apis__library__footer}>
                                <div className={stylesBlog.section__result__content__pagination}>
                                  <div
                                    className={
                                      stylesBlog.section__result__content__pagination__buttons__before
                                    }
                                  >
                                    <Icon id='MdNavigateBefore' />
                                    <p>Anterior</p>
                                  </div>
                                  <div className={stylesBlog.section__result__content__pagination__number}>
                                    <p>01</p>
                                    <p>02</p>
                                    <p>...</p>
                                    <p>10</p>
                                  </div>
                                  <div
                                    className={
                                      stylesBlog.section__result__content__pagination__buttons__next
                                    }
                                  >
                                    <p>Siguente</p>
                                    <Icon id='MdNavigateNext' />
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))
                      ) : (null)}
                      {/* <div label='Todos'>
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

                        <div className={stylesBlog.apis__library}>
                          <div id='Cards' className={stylesBlog.apis__library__cards}>
                            {
                              blogs.length === 0 ? (
                                <span>Sin resultados disponibles</span>
                              ) : (
                                blogs.map((results, index) => (
                                  <Link to={`/blog/${results.id}`} key={index}>
                                    <CardInformation
                                      img={results.image ? results.image[0].url : ''}
                                      description={results.description}
                                      title={results.title}
                                      buttons={results.tags && results.tags.length > 0 ? results.tags : []}
                                    />
                                  </Link>
                                ))
                              )
                            }
                          </div>
                          <div id='Suggestions' className={`d-xs-none ${stylesBlog.apis__library__suggestions}`}>
                            <div className={stylesBlog.apis__library__suggestions__content}>
                              <h1 className={stylesBlog.apis__library__suggestions__content__title}>Lo más reciente</h1>
                              <Novedades />
                            </div>
                          </div>
                          <div id='Contact' className={stylesBlog.apis__library__contact}>
                            <Contact />
                          </div>
                          <div id='Footer' className={stylesBlog.apis__library__footer}>
                            <div className={stylesBlog.section__result__content__pagination}>
                              <div
                                className={
                                  stylesBlog.section__result__content__pagination__buttons__before
                                }
                              >
                                <Icon id='MdNavigateBefore' />
                                <p>Anterior</p>
                              </div>
                              <div className={stylesBlog.section__result__content__pagination__number}>
                                <p>01</p>
                                <p>02</p>
                                <p>...</p>
                                <p>10</p>
                              </div>
                              <div
                                className={
                                  stylesBlog.section__result__content__pagination__buttons__next
                                }
                              >
                                <p>Siguente</p>
                                <Icon id='MdNavigateNext' />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div> */}
                      {/* <div label='Novedades'>
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
                              {resultsData.length === 0 ? (
                                <p>Sin Resultados</p>
                              ) : (
                                resultsData.map((result, index) => (
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
                        </div>
                      </div>
                      <div label='Desarrolladores'>
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
                              {resultsData.length === 0 ? (
                                <p>Sin Resultados</p>
                              ) : (
                                resultsData.map((result, index) => (
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
                        </div>
                      </div> */}
                      {/* <div label='APIs'>
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
                              {resultsData.length === 0 ? (
                                <p>Sin Resultados</p>
                              ) : (
                                resultsData.map((result, index) => (
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
                        </div>
                      </div>
                      <div label='Empresas'>
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
                              {resultsData.length === 0 ? (
                                <p>Sin Resultados</p>
                              ) : (
                                resultsData.map((result, index) => (
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
                        </div>
                      </div> */}
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
