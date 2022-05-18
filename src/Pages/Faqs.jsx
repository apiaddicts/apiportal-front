import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '../redux/actions/faqAction';

import Accordion from '../components/Accordion/Accordion';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import BannerStatic from '../components/Banner/BannerStatic';

import classes from '../styles/pages/faqs.module.scss';

function Faqs(props) {
  const [active, setActive] = useState({
    filter: false,
    item: null,
  });
  const dispatch = useDispatch();
  const { dataFaq } = useSelector((state) => state.faq);

  useEffect(() => {
    if (dataFaq && Object.keys(dataFaq).length === 0) {
      dispatch(getFaq());
    }
  }, []);

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
    <div style={{ paddingTop: '114px' }}>
      {Object.keys(dataFaq).length > 0 ? (
        <div>
          <BannerStatic
            title={dataFaq.contentSections[0].title}
            img={dataFaq.contentSections[0].background.url}
          />

          <section className={`container ${classes.faq}`}>
            <div className={classes.faq__content}>
              <div className={`d-xs-none ${classes.faq__content__filter}`}>
                <AccordionFilter items={fFaqs} active={active} setActive={setActive} />
              </div>
              <div className={classes.faq__content__qa}>
                { faqs.length > 0 ? (
                  faqs.map((item, i) => (
                    <div key={i}>
                      <h1 className='h3 text__primary mb-5 mt-5'>{item.question}</h1>
                      {item.data.map((faq, index) => (
                        <div className={classes.faq__question}>
                          <Accordion key={index} title={faq.title} active={active} setActive={setActive} />
                        </div>
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
