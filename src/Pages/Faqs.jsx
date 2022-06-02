import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '../redux/actions/faqAction';

import Accordion from '../components/Accordion/Accordion';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import BannerStatic from '../components/Banner/BannerStatic';

import classes from '../styles/pages/faqs.module.scss';

function Faqs(props) {
  const [clicked, setClicked] = useState(0);
  const [subItem, setSubItem] = useState(0);
  const [smallItem, setSmallItem] = useState(false);
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
                <AccordionFilter items={fFaqs} clicked={clicked} setClicked={setClicked} subItem={subItem} setSubItem={setSubItem} />
              </div>
              <div className={classes.faq__content__qa}>
                { faqs.length > 0 ? (
                  faqs.map((item, i) => {
                    return (
                      <div key={i}>
                        <h1 className='h3 text__primary mb-5 mt-5'>{item.question}</h1>
                        <Accordion items={item.data} arrItems={faqs} subItem={subItem} setSubItem={setSubItem} clicked={clicked} setClicked={setClicked} />
                      </div>
                    );
                  })
                ) : null}
              </div>
              <div className='d-xs-only'>
                <div className={`row ${classes.faq__content__qa__xs}`}>
                  {
                    faqs.length > 0 ? (
                      faqs.map((faq, index) => {
                        return (
                          <div key={index} className='flex-sm-12'>
                            <h1 className={`${classes.faq__content__qa__xs__title} text__primary mb-5 mt-5`}>{faq.question}</h1>
                            <Accordion items={faq.data} subItem={smallItem} setSubItem={setSmallItem} />
                          </div>
                        );
                      })
                    ) : null
                  }
                </div>
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
