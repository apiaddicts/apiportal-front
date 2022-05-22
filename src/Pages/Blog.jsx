import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import stylesBlog from '../styles/pages/blog.module.scss';
import classes from '../styles/pages/home.module.scss';
// import jsonData from '../data-fake.json';

import BannerStatic from '../components/Banner/BannerStatic';
import Tabs from '../components/Tabs/Tabs';
import CardInformation from '../components/Card/CardInformation';
import Novedades from '../components/Novedades';
import Contact from '../components/Contact';
import SkeletonComponent from '../components/SkeletonComponent/SkeletonComponent';
import Slick from '../components/SlickSlider/Slick';

import useSearch from '../hooks/useSearch';
import Icon from '../components/MdIcon/Icon';
import { getBlogData, getBlogs } from '../redux/actions/blogAction';

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

function Blog() {
  const { blogs, data } = useSelector((state) => state.blog);
  // eslint-disable-next-line no-unused-vars
  const [resultsSearch, setResultsSearch] = useState([]);
  const [resultsData, setResultsData] = useState(blogs);

  const dispatch = useDispatch();

  const { value, setValue, formik } = useSearch({
    initialState: {
      search: '',
    },
  });

  const results = blogs.filter((item) => {
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
    setResultsData(blogs);

    if (data && Object.keys(data).length === 0) {
      dispatch(getBlogData());
    }
  }, [dispatch, blogs, data]);

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
    <div style={{ paddingTop: '114px' }}>
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
                                  theme='primary'
                                  css_styles={{ 'override_card_style': 'no__shadow' }}
                                  blog={true}
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
                                          css_styles={{ 'override_card_height': 'custom_card__height' }}
                                          theme='primary'
                                        />
                                      </Link>
                                    ))
                                  )
                                }
                              </div>
                              <div id='Suggestions' className={`d-xs-none ${stylesBlog.apis__library__suggestions}`}>
                                <div className={stylesBlog.apis__library__suggestions__content}>
                                  <h1 className={`${stylesBlog.apis__library__suggestions__content__title} fs__16 text-uppercase text__gray__gray_darken`}>Lo más reciente</h1>
                                  <Novedades />
                                  <Contact />
                                </div>
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
                    resultsSearch.map((results, index) => (
                      <Link to={`/blog/${results.id}`} key={index}>
                        <CardInformation
                          img={results.image ? results.image[0].url : ''}
                          description={results.description}
                          title={results.title}
                          buttons={results.tags && results.tags.length > 0 ? results.tags : []}
                        />
                      </Link>
                    ))
                  )}
                </div>
              </section>
            )

          }
          <section className={`${classes.section__news} ${classes.section__news_toppadding}`}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 text__primary'>También te puede interesar</h1>
                </div>

                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1 text__gray__gray_darken'>
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
                <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center'>
                  <a href=''>Ver más</a>
                </div>
              </div>
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
