import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import moment from 'moment';
import Chip from '../Chip/Chip';

moment.locale('es');

function BlogDetailsInfo({ styles, data }) {
  const styleChip = {
    color: '#0033A0',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  };

  return (
    <>
      <div className={styles.blog__details__header}>
        <div className={styles.blog__details__header__content}>
          <div className={styles.blog__details__header__title}>
            <p>{data.timeRead ? data.timeRead : 'Lectura de 5 min.'}</p>
            <p>{data.created_at ? moment(data.created_at, moment.HTML5_FMT.DATETIME_LOCAL).format('L') : '16 febrero del 2022'}</p>
          </div>
          <div className={styles.blog__details__header__tags}>
            {data.tags.length > 0 ? data.tags.map((tag, index) => (
              <span key={index} className={styles.blog__details__tag}>
                <Chip title={tag.title} className='gray' styleChip={styleChip} />
              </span>
            )) : (null)}
          </div>
        </div>
        <p className={styles.blog__details__header__subtitle}>
          {data.description ? data.description : '' }
        </p>
        <div className={styles.blog__details__header__icons}>
          <div className={styles.blog__details__social__icons}>
            <div className={styles.blog__details__social__icon__content}>
              <FaFacebookF />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaTwitter />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaLinkedinIn />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaTelegramPlane />
            </div>
          </div>
        </div>
      </div>

      {data.questions.length > 0 ? data.questions.map((question, i) => (
        question.seccion === 'Normal' ? (
          <div key={i} className={styles.blog__details}>
            <div className={styles.blog__details__content__description}>
              <p className={styles.blog__details__title}>{question.question ? question.question : ''}</p>
              <p className={styles.blog__details__title__text}>
                {question.description ? question.description : '' }
              </p>
            </div>
            <div className={styles.blog__details__image__container}>
              <img src={question.img && question.img.length > 0 ? question.img[0].url : 'https://picsum.photos/500/300'} alt='' srcSet='' />
            </div>
          </div>
        ) : question.seccion === 'Reverse' ? (
          <div key={i} className={styles.blog__details__row__reverse}>
            <div className={styles.blog__details__content__description}>
              <p className={styles.blog__details__title}>{question.question ? question.question : ''}</p>
              <p className={styles.blog__details__title__text}>
                {question.description ? question.description : '' }
              </p>
            </div>
            <div className={styles.blog__details__image__container}>
              <img src={question.img && question.img.length > 0 ? question.img[0].url : 'https://picsum.photos/500/300'} alt='' srcSet='' />
            </div>
          </div>
        ) : (
          <div key={i} className={styles.blog__details__content__description__footer}>
            <p className={styles.blog__details__title}>{question.question ? question.question : ''}</p>
            <p className={styles.blog__details__title__text}>
              {question.description ? question.description : ''}
            </p>
          </div>
        )
      )) : (null)}

      <div className={styles.blog__details__list__content}>
        <div className={styles.blog__details__social__content}>
          <p>COMPARTIR:</p>
          <div className={styles.blog__details__social__icons}>
            <div className={styles.blog__details__social__icon__content}>
              <FaFacebookF />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaTwitter />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaLinkedinIn />
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <FaTelegramPlane />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BlogDetailsInfo;
