import React from 'react';
import Chip from '../Chip/Chip';

function BlogDetailsInfo({ styles }) {
  const tags = ['APIS', 'Desarrollador', 'Empresas'];
  return (
    <>
      <div className={styles.blog__details__header}>
        <div className={styles.blog__details__header__content}>
          <div className={styles.blog__details__header__title}>
            <p>Lectura de 5 min.</p>
            <p>16 febrero del 2022</p>
          </div>
          <div className={styles.blog__details__header__tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.blog__details__tag}>
                <Chip title={tag} className='gray' />
              </span>
            ))}
          </div>
        </div>
        <p>In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc dignissim eu.  Proin eros elit, aliquet nec magna ornare, luctus posuere lacus. Proin placerat viverra lacus at dignissim. </p>
      </div>
      <div className={styles.blog__details}>
        <div className={styles.blog__details__content__description}>
          <p className={styles.blog__details__title}>¿Qué son las APIs de auto flexible?</p>
          <p className={styles.blog__details__title__text}>
            In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus. Proin placerat viverra lacus at dignissim.
            In egestas blandit felis id porttitor.
            Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
          </p>
          <p className={styles.blog__details__title__text}>
            In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
          </p>
        </div>
        <div className={styles.blog__details__image__container}>
          <img src='https://picsum.photos/500/300' alt='' srcSet='' />
        </div>
      </div>
      <div className={styles.blog__details__row__reverse}>
        <div className={styles.blog__details__content__description}>
          <p className={styles.blog__details__title}>¿Qué son las APIs de auto flexible?</p>
          <p className={styles.blog__details__title__text}>
            In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus. Proin placerat viverra lacus at dignissim.
            In egestas blandit felis id porttitor.
            Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
          </p>
          <p className={styles.blog__details__title__text}>
            In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
            dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
          </p>
        </div>
        <div className={styles.blog__details__image__container}>
          <img src='https://picsum.photos/500/300' alt='' srcSet='' />
        </div>
      </div>
      <div className={styles.blog__details__content__description__footer}>
        <p className={styles.blog__details__title}>¿Qué son las APIs de auto flexible?</p>
        <p className={styles.blog__details__title__text}>
          In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
          dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus. Proin placerat viverra lacus at dignissim.
          In egestas blandit felis id porttitor.
          Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
          dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
        </p>
        <p className={styles.blog__details__title__text}>
          In egestas blandit felis id porttitor. Mauris vel nibh ex. Integer iaculis placerat nunc, in ultricies nunc
          dignissim eu. Proin eros elit, aliquet nec magna ornare, luctus posuere lacus.
        </p>
        <div className={styles.blog__details__list__content}>
          <ul className={styles.blog__details__list}>
            <li className={styles.blog__details__list__content__items}>
              <p className={styles.blog__details__list__item__title}>
                <span className={styles.blog__details__list__item__title__text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </p>
            </li>
            <li className={styles.blog__details__list__content__items}>
              <p className={styles.blog__details__list__item__title}>
                <span className={styles.blog__details__list__item__title__text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </p>
            </li>
            <li className={styles.blog__details__list__content__items}>
              <p className={styles.blog__details__list__item__title}>
                <span className={styles.blog__details__list__item__title__text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsInfo;
