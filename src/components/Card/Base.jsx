import React from 'react';

function Base({ children, maxWidth, css_styles }) {
  const { override_card_style, override_card_height } = css_styles;
  const cardStyle = (width) => ({
    maxWidth: `${width}px`,
  });
  return <div className={`card ${override_card_style} ${override_card_height}`} style={cardStyle(maxWidth)}>{children}</div>;
}

Base.defaultProps = {
  css_styles: '',
};

export default Base;
