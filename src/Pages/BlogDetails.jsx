import React from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import BlogDetailsInfo from '../components/BlogDetails';
import Carousel from '../components/Carousel/Carousel';
import Contact from '../components/Contact';
import FooterAuthor from '../components/FooterAuthor';
import styles from '../styles/pages/blogDetails.module.scss';
import classes from '../styles/pages/home.module.scss';

function BlogDetails() {
  return (
    <>
      <BannerStatic
        title='Descubre las novedades de SURA'
        img='https://picsum.photos/1920/300'
      />
      <section className='container mt-10 py-5'>
        <BlogDetailsInfo styles={styles} />
        <FooterAuthor />
        <section className={classes.section__news}>
          <div className='container my-10'>
            <div className={classes.section__news__title}>
              <h1 className='h2 text__primary'>También te puede interesar</h1>
            </div>
            <div className='mb-15'>
              <p className='body-1 my-9'>Conoce todas las novedades sobre tecnología, APIs y transformación digital</p>
            </div>
            <Carousel />
          </div>
        </section>
      </section>
      <Contact />
    </>
  );
};

export default BlogDetails;
