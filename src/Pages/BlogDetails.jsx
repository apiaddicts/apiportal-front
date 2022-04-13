import React from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import BlogDetailsInfo from '../components/BlogDetails';
import styles from '../styles/pages/blogDetails.module.scss';

function BlogDetails() {
  return (
    <>
      <BannerStatic
        title='Descubre las novedades de SURA'
        img='https://picsum.photos/1920/300'
      />
      <section className='container mt-10 py-5'>
        <BlogDetailsInfo styles={styles} />
      </section>
    </>
  );
};

export default BlogDetails;
