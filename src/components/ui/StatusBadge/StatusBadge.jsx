import React from 'react';
import classes from './status-badge.module.scss';

function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase();
  const variant = classes[key] || '';
  return <span className={`${classes.badge} ${variant}`.trim()}>{status}</span>;
}

export default StatusBadge;
