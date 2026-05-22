import React from 'react';
import { Link } from 'react-router-dom';
import classes from './button.module.scss';

const VARIANTS = {
  primary: classes.primary,
  secondary: classes.secondary,
  ghost: classes.ghost,
};

const SIZES = {
  md: '',
  sm: classes.sizeSm,
};

function buildClassName({ variant, size, fullWidth, className }) {
  return [
    classes.button,
    VARIANTS[variant] || classes.primary,
    SIZES[size] || '',
    fullWidth ? classes.fullWidth : '',
    className || '',
  ].filter(Boolean).join(' ');
}

function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  href,
  className,
  type = 'button',
  ...rest
}) {
  const cls = buildClassName({ variant, size, fullWidth, className });

  if (to) return <Link to={to} className={cls} {...rest} />;
  if (href) return <a href={href} className={cls} {...rest} />;
  return <button type={type} className={cls} {...rest} />;
}

export default Button;
