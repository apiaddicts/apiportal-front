import React from 'react';
import classes from './status-badge.module.scss';

function StatusBadge({ status, children }) {
  const key = String(status || '').toLowerCase();
  const variant = classes[key] || '';
  return <span className={`${classes.badge} ${variant}`.trim()}>{children ?? status}</span>;
}

export default StatusBadge;
