import React from 'react';
import classes from './card.module.scss';

const ICON_VARIANTS = {
  success: classes.iconSuccess,
  error: classes.iconError,
  info: classes.iconInfo,
};

const LAYOUTS = {
  centered: { wrap: classes.centered, card: classes.cardCentered },
  wide:     { wrap: classes.wide,     card: classes.cardWide },
  none:     { wrap: '',               card: '' },
};

export function CardIcon({ variant = 'info', children }) {
  return (
    <div className={`${classes.icon} ${ICON_VARIANTS[variant]}`} aria-hidden="true">
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return <h1 className={classes.title}>{children}</h1>;
}

export function CardBody({ children }) {
  return <p className={classes.body}>{children}</p>;
}

export function CardMuted({ children }) {
  return <p className={classes.muted}>{children}</p>;
}

function Card({ layout = 'centered', as: Tag = 'section', className = '', children }) {
  const L = LAYOUTS[layout] || LAYOUTS.none;
  return (
    <div className={`${classes.layout} ${L.wrap}`.trim()}>
      <Tag className={`${classes.card} ${L.card} ${className}`.trim()}>
        {children}
      </Tag>
    </div>
  );
}

export default Card;
