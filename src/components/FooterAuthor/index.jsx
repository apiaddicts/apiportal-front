import React from 'react';
import ItemAvatar from '../Item/ItemAvatar';
import classes from './footer-social.module.scss';

function FooterAuthor({ data }) {
  console.log(data);
  return (
    <div className={classes.footer__author}>
      <ItemAvatar
        divider
        img={data.photoUser && data.photoUser.length > 0 ? data.photoUser[0].url : 'https://api.lorem.space/image/face?w=150&h=150'}
        title={data.nameUser ? data.nameUser : ''}
        paragraph={data.jobUser ? data.jobUser : ''}
      />
    </div>
  );
};

export default FooterAuthor;
