import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import moment from 'moment';
import { HashLink } from 'react-router-hash-link';
import useSearch from '../../../hooks/useSearch';
import { getBlogData, getBlogs } from '../../../redux/actions/blogAction';
import BannerStatic from '../../../components/Banner/BannerStatic';
import Tabs from '../../../components/Tabs/Tabs';
import CardInformation from '../../../components/Card/CardInformation';
import Novedades from '../../../components/Novedades';
import Contact from '../../../components/Contact';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import Slick from '../../../components/SlickSlider/Slick';
import BlogPostsPaginated from '../../../components/BlogPostsPaginated';
import stylesBlog from './blog.module.scss';
import classes from './home.module.scss';

moment.locale('es');
function Blog({ setIsOpen }) {
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
    return formik.values.search === '' ? null : item.title.toLowerCase().includes(value.toLowerCase());
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
  }, [blogs]);

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

  const datanews = blogs.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item.image[0].url,
      title: item.title,
      description: item.description,
      linkText: 'Conoce más',
      route: `/blog/${item.id}#blogDetail`,
    };
    return itemData;
  }) : [];

  return (
    <div id='blogIndex' style={{ paddingTop: '114px' }}>
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
                  css_styles={{ 'custom_padding': 'px-3' }}
                />
              ) : (null)
            }
          </section>
          {
            resultsSearch.length === 0 && formik.values.search === '' ? (
              <section className='container px-3'>
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
                                  css_styles={{ 'override_card_style': 'no__shadow', 'custom_margin_top': 'mt-4' }}
                                  blog={true}
                                />
                              </div>
                            </div>
                            <div className={stylesBlog.apis__library}>
                              <div id='Cards'>
                                {
                                  resultsData.length === 0 ? (
                                    <span>Información no disponible</span>
                                  ) : (
                                    <BlogPostsPaginated
                                      posts={resultsData}
                                      itemsPerPage={6}
                                    />
                                  )
                                }
                              </div>
                              <div id='Suggestions' className={`d-xs-none ${stylesBlog.apis__library__suggestions}`}>
                                <div className={stylesBlog.apis__library__suggestions__content}>
                                  <h1 className={`${stylesBlog.apis__library__suggestions__content__title} fs__16 text-uppercase text__gray__gray_darken`}>Lo más reciente</h1>
                                  <Novedades data={resultsData} />
                                  <Contact pathname='/blog' />
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
                {resultsSearch.length === 0 ? (
                  <p>Información no disponible</p>
                ) : (
                  <BlogPostsPaginated
                    posts={resultsData}
                    itemsPerPage={6}
                    parentContainerClass='full_blog_list'
                  />
                )}
              </section>
            )
          }
          {
            resultsSearch.length === 0 ? (
              <section className={`${classes.section__news} ${classes.section__news_toppadding} d-xs-none`}>
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
                      <HashLink smooth to='/blog#blogIndex'>
                        <div>Ver más</div>
                      </HashLink>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section>
                <Contact css_styles={{ 'display_detail_description': 'd-block', 'border_radius': 'no_border__radius' }} />
              </section>
            )
          }
        </div>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
}

export default Blog;
