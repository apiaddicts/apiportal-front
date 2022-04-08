import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import classes from './icon.module.scss';

function Icon({ id }) {
  function icon(iconName) {
    const mdIcon = React.createElement(MaterialDesign[iconName]);
    if (mdIcon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return mdIcon;
  }
  return (
    <div className={classes.container__icon}>{icon(id)}</div>
  );
}

export default Icon;
