import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'underscore';
import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';

import BannerStatic from '../../../components/Banner/BannerStatic';
import BlogDetailsInfo from '../../../components/BlogDetails';
import Slick from '../../../components/SlickSlider/Slick';
import FooterAuthor from '../../../components/FooterAuthor';
import { getBlog, resetGetBlog, getBlogs } from '../../../redux/actions/blogAction';
import styles from './blog-post.module.scss';
import classes from './home.module.scss';
import Icon from '../../../components/MdIcon/Icon';

const stylesPerso = {
  height: '345px',
  paddingTop: '0px',
  paddingBottom: '0px',
};

const stylesBannerTitle = {
  marginTop: '101px',
};

moment.locale('es');

function BlogDetails({ setIsOpen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const params = useParams();
  const { blog, blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    if (params?.id) {
      dispatch(getBlog(params?.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (blogs && blogs.length === 0) {
      dispatch(getBlogs());
    }

    dispatch(resetGetBlog());
  }, []);

  const datanews = blogs.length > 0 ? _.sortBy(blogs, (m) => {
    return moment(m.created_at).toDate().getTime();
  }) : [];

  const slidesNew = datanews.length > 0 ? datanews.reverse().slice(0, 6).map((item, i) => {
    const itemData = {
      img: item?.image?.[0]?.url,
      title: item?.title,
      description: item?.description,
      linkText: t('Blog.learnMore'),
      route: `/blog/${item?.id}#blogDetail`,
    };
    return itemData;
  }) : [];

  return (
    <div id='blogDetail'>
      <Helmet>
        <title>{blog?.title ? blog?.title : ''}</title>
        <meta name='author' content={blog?.nameUser ? blog?.nameUser : ''} />
        <meta
          name='description'
          content={blog?.description ? blog?.description : ''}
        />
        <meta property='og:title' content={blog?.title ? blog?.title : ''} />
        <meta property='og:image' content={blog?.image ? blog?.image?.[0]?.url : ''} />
        <meta property='og:description' content={blog?.description ? blog?.description : ''} />
        <meta property='og:url' content={`${window.location.protocol}//${window.location.hostname}/blog/${blog?.id}`} />
        <meta property='og:locale' content='es_MX' />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content='Worlters Kluwer | Developer Portal' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='Worlters Kluwer | Developer Portal' />
        <meta name='twitter:title' content={blog?.title ? blog?.title : ''} />
        <meta name='twitter:description' content={blog?.description ? blog?.description : ''} />
        <meta name='twitter:image' content={blog?.image ? blog?.image?.[0]?.url : ''} />
      </Helmet>
      {blog && Object.keys(blog).length > 0 ? (
        <>
          <BannerStatic
            title={blog?.title ? blog?.title : t('Blog.discoverNews')}
            img={blog?.image ? blog?.image?.[0]?.url : ''}
            styles={stylesPerso}
            stylesTitle={stylesBannerTitle}
          />
          <section className='container mt-10 mb-10'>
            <div
              className={classes.backTo}
            >
              <Link to={-1} className={`${classes.backTo__btn} card__link`}>
                <div>
                  <Icon id='MdKeyboardBackspace' />
                </div>
                <div className={classes.backTo__label}>
                  <span>{t('Blog.goBack')}</span>
                </div>
              </Link>
            </div>
            <BlogDetailsInfo styles={styles} data={blog} />
            <FooterAuthor data={blog} />
          </section>
          <section className={classes.section__news}>
            <div className='container'>
              <div className='row'>
                <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                  <h1 className='h2 font-weight-bold text__dark__primary fs__joey'>{t('Blog.news')}</h1>
                </div>
                <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                  <p className='body-1'>
                    {t('Blog.newsDescription')}
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
                <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center mt-8'>
                  <HashLink smooth to='/blog#blogIndex'>
                    <div className='d-xs-none link__tertiary'>{t('Blog.seeMore')}</div>
                    <div className='d-xs-only link__tertiary'>{t('Blog.seeAll')}</div>
                  </HashLink>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (null)}

    </div>
  );
};

export default BlogDetails;
