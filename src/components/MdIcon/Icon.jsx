import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import classes from './icon.module.scss';

function Icon({ id, css_styles = {} }) {
  const { custom_icon_styles = '' } = css_styles;

  const renderIcon = (iconName) => {
    const IconComponent = MaterialDesign[iconName] || MaterialDesign.MdApi;
    return <IconComponent />;
  };

  return (
    <div className={`${classes.container__icon} ${custom_icon_styles}`}>
      {renderIcon(id)}
    </div>
  );
}

export default Icon;