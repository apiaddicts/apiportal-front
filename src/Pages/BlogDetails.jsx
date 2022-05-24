import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import BannerStatic from '../components/Banner/BannerStatic';
import BlogDetailsInfo from '../components/BlogDetails';
import Slick from '../components/SlickSlider/Slick';
import Contact from '../components/Contact';
import FooterAuthor from '../components/FooterAuthor';
import { getBlog, resetGetBlog } from '../redux/actions/blogAction';
import styles from '../styles/pages/blogDetails.module.scss';
import classes from '../styles/pages/home.module.scss';
import Icon from '../components/MdIcon/Icon';

const slidesNew = [
  {
    img: 'https://picsum.photos/id/0/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1031/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1066/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1078/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
  {
    img: 'https://picsum.photos/id/1079/370/240',
    title: 'Lorem ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  standard dummy text ever.',
    linkText: 'Conoce más',
  },
];

const stylesPerso = {
  height: '345px',
  paddingTop: '0px',
  paddingBottom: '0px',
};

const stylesBannerTitle = {
  marginTop: '101px',
};

function BlogDetails({ setIsOpen }) {
  const dispatch = useDispatch();

  const params = useParams();
  const { blog } = useSelector((state) => state.blog);
  useEffect(() => {
    if (params.id && Object.keys(blog).length === 0) {
      dispatch(getBlog(params.id));
    }
    return () => {
      dispatch(resetGetBlog());
    };
  }, []);

  return (
    <div>
      {Object.keys(blog).length > 0 ? (
        <>
          <BannerStatic
            title={blog.title ? blog.title : 'Descubre las novedades de SURA'}
            img={blog.image ? blog.image[0].url : 'https://picsum.photos/1920/300'}
            styles={stylesPerso}
            stylesTitle={stylesBannerTitle}
          />
          <section className='container mt-10 py-5'>
            <BlogDetailsInfo styles={styles} data={blog} />
            <FooterAuthor data={blog} />
            <section className={styles.container_arrows}>
              <div className={styles.container_arrows__left}>
                <span className='fs__24 text__secondary'><Icon id='MdChevronLeft' /></span>
                <span>Anterior</span>
              </div>
              <div className={styles.container_arrows__right}>
                <span>Siguiente</span>
                <span className='fs__24 text__secondary'><Icon id='MdChevronRight' /></span>
              </div>
            </section>
            <section className={classes.section__news}>
              <div className='container'>
                <div className='row'>
                  <div className={`flex-md-12 flex-sm-12 ${classes.section__news__title}`}>
                    <h1 className='h2 text__primary'>También te puede interesar</h1>
                  </div>

                  <div className={`flex-md-12 flex-sm-12 d-xs-none ${classes.section__news__subtitle}`}>
                    <p className='body-1'>
                      Conoce todas las novedades sobre tecnología, APIs y transformación digital
                    </p>
                  </div>
                </div>
              </div>
              <div className='container'>
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12'>
                    <Slick slides={slidesNew} setIsOpen={setIsOpen} />
                  </div>
                </div>
              </div>
              <div className={`container ${classes.section__news__showmore}`}>
                <div className='row justify-center'>
                  <div className='flex-lg-2 flex-md-6 flex-sm-12 text-center mt-8'>
                    <HashLink smooth to='/apis#apiHome'>
                      <div className='d-xs-none'>Ver Más</div>
                      <div className='d-xs-only'>Ver todas</div>
                    </HashLink>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className={styles.container_contact__details}>
            <Contact css_styles={{ 'display_detail_description': 'd-block', 'border_radius': 'no_border__radius' }} />
          </section>
        </>
      ) : (null)}

    </div>
  );
};

export default BlogDetails;
