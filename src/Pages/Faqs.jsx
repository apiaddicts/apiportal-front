import React from 'react';
import Accordion from '../components/Accordion/Accordion';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import BannerStatic from '../components/Banner/BannerStatic';
import classes from '../styles/pages/faqs.module.scss';

function Faqs(props) {
  const faqs = [
    { title: 'Información', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.' },
    { title: 'dicta dolor suscipit', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.' },
    { title: 'dicta dolor suscipit', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.' },
    { title: 'dicta dolor suscipit', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur hic amet blanditiis cumque accusamus maxime beatae dolorem placeat, quae illum facere nostrum quam, eum porro dolor veniam. Est accusantium maxime, mollitia voluptate rerum ut voluptatum. Minus quas nam repellendus rem. Nam officiis corporis ipsa? Rerum, omnis? Quos quod odio itaque.' },
  ];

  const items = [
    { title: '¿Cómo empezar?', questions: ['Información', 'quibusdam laudantium eligendi', 'facilis pariatur voluptate', 'provident amet non'] },
    { title: 'Facturación', questions: ['Información', 'quibusdam laudantium eligendi', 'facilis pariatur voluptate', 'provident amet non'] },
    { title: 'Activación cuenta', questions: ['Información', 'quibusdam laudantium eligendi', 'facilis pariatur voluptate', 'provident amet non'] },
    { title: 'eligendi temporibus reiciendis', questions: ['Información', 'quibusdam laudantium eligendi', 'facilis pariatur voluptate', 'provident amet non'] },
  ];
  return (
    <div>
      <BannerStatic
        title='Preguntas frecuentes'
        img='https://picsum.photos/1920/300'
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
  );
}

export default Faqs;
