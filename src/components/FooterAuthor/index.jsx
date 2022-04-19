import React from 'react';
import ItemAvatar from '../Item/ItemAvatar';
import classes from './footer-social.module.scss';

function FooterAuthor() {
  return (
    <div className={classes.footer__author}>
      <ItemAvatar
        divider
        img='https://api.lorem.space/image/face?w=150&h=150'
        title='María Mercedes Barrera'
        paragraph='Directora Ejecutiva Fundación Sura'
      />
    </div>
  );
};

export default FooterAuthor;
