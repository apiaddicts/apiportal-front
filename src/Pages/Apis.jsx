import React from 'react';
import { Link } from 'react-router-dom';
import AccordionCheck from '../components/Accordion/AccordionCheck';
import BannerImage from '../components/Banner/BannerImage';
import SearchInput from '../components/Input/SearchInput';
import InputSelect from '../components/Input/InputSelect';

import classes from '../styles/pages/api.module.scss';
import Base from '../components/Card/Base';

function Apis() {

  const items = [
    {
      title: 'Titulo 1',
      questions: ['Titulo1.1', 'Titulo1.2', 'Titulo1.3'],
    },
    {
      title: 'Titulo 2',
      questions: ['Titulo2.1', 'Titulo2.2', 'Titulo2.3', 'Titulo2.4', 'Titulo2.5'],
    },
    {
      title: 'Titulo 3',
      questions: ['Titulo3.1', 'Titulo3.2'],
    },
  ];
  return (
    <>
      <BannerImage />
      <section className={classes.container}>
        <article className={classes.container__left}>
          <AccordionCheck items={items} />
          <AccordionCheck items={items} />
          <AccordionCheck items={items} />
        </article>
        <section className={classes.container__right}>
          <div className='w-full'>
            <SearchInput
              name='search'
              type='text'
              placeholder='Buscar APIs...'
            />
          </div>
          <div className='w-full'>
            <div className={classes.box}>
              <select className='w-full'>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
              </select>
            </div>
            <InputSelect />
            <div
              style={{
                width: '200px',
              }}
              className='mt-9'
            >
              <Base>
                <div className='p-9'>
                  <Link to='/api/1'>
                    <span>API</span>
                  </Link>
                </div>
              </Base>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Apis;
