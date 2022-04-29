import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '../redux/actions/faqAction';

import Accordion from '../components/Accordion/Accordion';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import BannerStatic from '../components/Banner/BannerStatic';

import classes from '../styles/pages/faqs.module.scss';

function Faqs(props) {
  const [active, setActive] = useState(false);
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

  const filterFaqs = dataFaq && dataFaq.contentSections ? dataFaq.contentSections.filter((item) => item.__component === 'sura.list-filter') : [];

  const faqs = filterFaqs.length > 0 ? filterFaqs.map((i, index) => {
    return {
      question: i.Title,
      data: i.items,
    };
  }) : [];

  const fFaqs = filterFaqs.length > 0 ? filterFaqs.map((i, index) => {
    const arrQa = i.items.map(({ title }) => title);
    return {
      title: i.Title,
      questions: arrQa,
    };
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
                <AccordionFilter items={fFaqs} />
              </div>
              <div className={classes.faq__content__qa}>
                { faqs.length > 0 ? (
                  faqs.map((item, i) => (
                    <div key={i}>
                      <h1 className='h3 text__primary mb-5'>{item.question}</h1>
                      {item.data.map((faq, index) => (
                        <Accordion key={index} title={faq.title} active={active} setActive={setActive} />
                      ))}
                    </div>
                  ))
                ) : null}
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
