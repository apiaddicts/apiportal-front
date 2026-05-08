import React from 'react';
import { Link } from 'react-router-dom';
import classes from './row-list.module.scss';

export function RowList({ children }) {
  return <ul className={classes.list}>{children}</ul>;
}

export function Row({ to, children, interactive = true, className = '' }) {
  const cls = `${classes.row} ${interactive ? '' : classes.rowStatic} ${className}`.trim();
  if (to) {
    return (
      <li>
        <Link to={to} className={cls}>{children}</Link>
      </li>
    );
  }
  return <li className={cls}>{children}</li>;
}

export function RowLabel({ children }) {
  return <span className={classes.label}>{children}</span>;
}

export default RowList;
