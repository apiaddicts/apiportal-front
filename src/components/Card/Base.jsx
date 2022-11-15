import React from 'react';

function Base({ children, maxWidth, css_styles }) {
  const { override_card_style, override_card_height, override_border__chip } = css_styles;
  const cardStyle = (width, height) => ({
    maxWidth: `${width}px`,
  });
  return <div className={`card ${override_card_style} ${override_card_height} ${override_border__chip}`} style={cardStyle(maxWidth)}>{children}</div>;
}

Base.defaultProps = {
  css_styles: '',
};

export default Base;
