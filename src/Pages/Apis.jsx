import React from 'react';
import AccordionCheck from '../components/Accordion/AccordionCheck';
import BannerImage from '../components/Banner/BannerImage';
import SearchInput from '../components/Input/SearchInput';

import classes from '../styles/pages/api.module.scss';

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
          <div>
            <SearchInput
              name='search'
              type='text'
              placeholder='Buscar APIs...'
            />
          </div>
          <div className={classes.box}>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
        </section>
      </section>
    </>
  );
};

export default Apis;
