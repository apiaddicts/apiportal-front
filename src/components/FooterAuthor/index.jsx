import React from 'react';
import ItemAvatar from '../Item/ItemAvatar';
import classes from './footer-social.module.scss';

function FooterAuthor({ data }) {
  return (
    <div className={classes.footer__author}>
      <ItemAvatar
        divider
        img={data?.photoUser && data?.photoUser?.length > 0 ? data?.photoUser?.[0]?.url : '/user_notfound.png'}
        title={data?.nameUser ? data?.nameUser : ''}
        paragraph={data?.jobUser ? data?.jobUser : ''}
      />
      <div className={classes.border_bottom__line}>&nbsp;</div>
    </div>
  );
};

export default FooterAuthor;
