import React from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import BlogNav from '../components/BlogNav';
import Base from '../components/Card/Base';
import Input from '../components/Input';
import imgBg from '../static/img/bg-01.png';

function Blog() {
  return (
    <>
      <section>
        <BannerStatic
          title='Descrubre las novedades de SURA'
          img={imgBg}
        />
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        >
          <div style={{
            display: 'flex',
            width: '50%',
            transform: 'translate(50%, -50%)',
            position: 'absolute',
            top: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <div style={{
              width: '25px',
              position: 'relative',
              left: '40px',
              top: '2px',
            }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <div style={{
              width: '100%',
            }}
            >
              <Input type='text' placeholder='         Buscar...' />
            </div>
          </div>
        </div>
      </section>
      {/* Nab Categories */}
      <section>
        <div>
          <BlogNav />
        </div>
      </section>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '1rem',
      }}
      >
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
        <div style={{
          maxWidth: '100%',
          padding: '20px',
        }}
        >
          <ResultCard />
        </div>
      </div>
    </>
  );
}
export default Blog;

function ResultCard() {
  return (
    <Base style={{
      padding: '30px',
    }}
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_960_720.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '200px',
          overflow: 'hidden',
        }}
      />
      <div style={{
        display: 'flex',
      }}
      />
      <h1 className='h1 text__primary'>Blog</h1>
      <h1>Blog</h1>
      <h1>Blog</h1>
      <h1>Blog</h1>
      <h1>Blog</h1>
    </Base>
  );
}
