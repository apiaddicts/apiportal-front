import React from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import Tabs from '../components/Tabs/Tabs';
import classes from '../styles/pages/blog.module.scss';

function Blog(props) {
  return (
    <div>
      <section>
        <BannerStatic title='Descubre las novedades de SURA' img='https://picsum.photos/1920/300' isSearch={true} />
      </section>
      <section className='container'>
        <div className={classes.section__experiences__tabs}>
          <Tabs>
            <div label='Novedades'>
              See ya later,
              <em>Alligator</em>
              !
            </div>
            <div label='Desarrolladores'>
              <h1>Hola mundo</h1>
            </div>
            <div label='APIs'>
              <h2>si</h2>
            </div>
            <div label='Empresas'>
              <h2>si</h2>
            </div>
            <div label='voluptas nulla dolorum'>
              <h2>si</h2>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default Blog;
