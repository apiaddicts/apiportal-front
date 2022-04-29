import React from 'react';
import { Link } from 'react-router-dom';

// import AccordionCheck from '../components/Accordion/AccordionCheck';

import BannerImage from '../components/Banner/BannerImage';
import SearchInput from '../components/Input/SearchInput';
import InputSelect from '../components/Input/InputSelect';

import classes from '../styles/pages/api.module.scss';
import Base from '../components/Card/Base';
import CheckboxWrapper from '../components/common/Check';
import CustomizedAccordions from '../components/common/AccordionMUI';

function Apis() {

  const items = [
    {
      title: 'ESTADO',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
        },
      ],
    },
    {
      title: 'SOLUTION',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
        },
      ],
    },
    {
      title: 'TAGS',
      options: [
        {
          label: 'Publicado',
          name: 'publicado',
        },
        {
          label: 'Deprecated',
          name: 'deprecated',
        },
      ],
    },
  ];
  return (
    <>
      <BannerImage />
      <section className={classes.container}>
        <article className={classes.container__left}>
          {
            items.map((item, index) => (
              <CustomizedAccordions key={index} title={item.title}>
                {
                  item.options.map((option, index) => (
                    <CheckboxWrapper name={option.name} label={option.label} key={index} />
                  ))
                }
              </CustomizedAccordions>
            ))
          }
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
