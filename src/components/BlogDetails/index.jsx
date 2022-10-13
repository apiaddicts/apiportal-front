import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/es';
import Chip from '../Chip/Chip';
import CustomMarkdown from '../CustomMarkdown';

moment.locale('es');

function BlogDetailsInfo({ styles, data }) {
  const styleChip = {
    color: '#1C2D47',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'capitalize',
  };

  const url = `${window.location.protocol}//${window.location.hostname}/blog/${data.id}`;

  return (
    <>
      <div className={styles.blog__details__header}>
        <div className={styles.blog__details__header__content}>
          <div className={styles.blog__details__header__title}>
            <p>{data.timeRead ? data.timeRead : 'Lectura de 5 min.'}</p>
            <p>{data.created_at ? moment(data.date).format('LL') : '16 febrero del 2022'}</p>
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
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target='_blank' rel='noreferrer'>
                <FaFacebookF />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target='_blank' rel='noreferrer'>
                <FaLinkedinIn />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://twitter.com/share?text=${data.title}&url=${url}`} target='_blank' rel='noreferrer'>
                <FaTwitter />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://telegram.me/share/url?text=${data.title}&url=${url}`} target='_blank' rel='noreferrer'>
                <FaTelegramPlane />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Change all section with only Markdown that receives from Strapi */}
      <div className='markdown__content'>
        <CustomMarkdown content={data?.content} />
      </div>

      <div className={styles.blog__details__list__content}>
        <div className={styles.blog__details__social__content}>
          <p>COMPARTIR:</p>
          <div className={styles.blog__details__social__icons}>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target='_blank' rel='noreferrer'>
                <FaFacebookF />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target='_blank' rel='noreferrer'>
                <FaLinkedinIn />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://twitter.com/share?text=${data.title}&url=${url}`} target='_blank' rel='noreferrer'>
                <FaTwitter />
              </a>
            </div>
            <div className={styles.blog__details__social__icon__content}>
              <a href={`https://telegram.me/share/url?text=${data.title}&url=${url}`} target='_blank' rel='noreferrer'>
                <FaTelegramPlane />
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BlogDetailsInfo;
