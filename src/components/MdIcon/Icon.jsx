import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import classes from './icon.module.scss';

function Icon({ id, css_styles }) {
  const { custom_icon_styles } = css_styles;
  function icon(iconName) {
    const mdIcon = React.createElement(MaterialDesign[iconName]);
    if (mdIcon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return mdIcon;
  }
  return (
    <div className={`${classes.container__icon} ${custom_icon_styles}`}>{icon(id)}</div>
  );
}

Icon.defaultProps = {
  css_styles: '',
};

export default Icon;
