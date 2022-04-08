import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '../redux/actions/faqAction';

import Accordion from '../components/Accordion/Accordion';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import BannerStatic from '../components/Banner/BannerStatic';

import classes from '../styles/pages/faqs.module.scss';

function Faqs(props) {

  const dispatch = useDispatch();
  const { dataFaq } = useSelector((state) => state.faq);

  useEffect(() => {
    if (dataFaq && Object.keys(dataFaq).length === 0) {
      dispatch(getFaq());
    }
  }, []);

  // const filterData = dataFaq && dataFaq.contentSections ? dataFaq.contentSections.filter((item) => item.__component === 'sura.list-buttons') : [];
  // const items = filterData.length > 0 ? filterData.map((i) => {
  //   const data = {};
  //   data.title = i.Name;
  //   data.questions = i.list.length > 0 ? i.list.map((d) => (d.name)) : [];;

  //   return data;
  // }) : [];
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

  const filterFaqs = dataFaq && dataFaq.contentSections ? dataFaq.contentSections.filter((item) => item.__component === 'elements.entry') : [];
  const faqs = filterFaqs.length > 0 ? filterFaqs.map((i) => {
    const data = {};
    data.title = i.title;
    data.body = i.content;

    return data;
  }) : [];

  return (
    <div>
      {Object.keys(dataFaq).length > 0 ? (
        <div>
          <BannerStatic
            title={dataFaq.contentSections[0].title}
            img={dataFaq.contentSections[0].background.url}
          />
          <section className='container mt-10 mb-10 pb-10 pt-10'>
            <div className={classes.faq__content}>
              <div className={classes.faq__content__filter}>
                <AccordionFilter items={items} />
              </div>

              <div className={classes.faq__content__qa}>
                <h1 className='h3 text__primary mb-5'>¿Cómo funciona?</h1>
                {faqs.map((faq) => (
                  <Accordion title={faq.title} body={faq.body} />
                ))}
              </div>

            </div>
          </section>
        </div>
      ) : (
        <h2>Cargando....</h2>
      )}
    </div>
  );
}

export default Faqs;
