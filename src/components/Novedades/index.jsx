import React from 'react';
import Contact from '../Contact';
import jsonData from '../../data-fake.json';
import stylesBlog from '../../styles/pages/blog.module.scss';

function Novedades() {
  return (
    <div style={{
      width: '40%',
      padding: '0 2rem',
    }}
    >
      <div style={{
        width: '100%',
      }}
      >
        <p className='subtitle-2 mb-6 text-uppercase font-weight-bold text__gray__gray_darken mb-2'>Lo más reciente</p>
      </div>
      {
        jsonData.length === 0 ?
          <p>No hay resultados</p> :
          jsonData.map((result, index) => (
            <div
              key={index}
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderTop: '1px solid #ccc',
              }}
            >
              <div style={{
                width: '100px',
                borderRadius: '100%',
                padding: '10px',
              }}
              >
                <img
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '100%',
                  }}
                  src={result.image}
                  alt=''
                />
              </div>
              <div style={{
                width: '100%',
                padding: '0 1rem',
              }}
              >
                <p className='text__primary pb-2'>Tu Salud - Lectura de 12 min.</p>
                <p className={`${stylesBlog.section__result__content__result__description} text__gray__gray_darken`}>{result.description}</p>
              </div>
            </div>
          ))
      }

      <Contact />
    </div>
  );
}

export default Novedades;
