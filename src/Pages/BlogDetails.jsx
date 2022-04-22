import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BannerStatic from '../components/Banner/BannerStatic';
import BlogDetailsInfo from '../components/BlogDetails';
import Carousel from '../components/Carousel/Carousel';
import Contact from '../components/Contact';
import FooterAuthor from '../components/FooterAuthor';
import { getBlog, resetGetBlog } from '../redux/actions/blogAction';
import styles from '../styles/pages/blogDetails.module.scss';
import classes from '../styles/pages/home.module.scss';

function BlogDetails() {
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

  console.log(blog.title);
  console.log(blog);

  return (
    <>
      <BannerStatic
        title={blog.title ? blog.title : 'Descubre las novedades de SURA'}
        img={blog.image ? blog.image[0].url : 'https://picsum.photos/1920/300'}
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
