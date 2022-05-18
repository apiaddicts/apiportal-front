import * as React from 'react';
import ColorButton from './style';

export default function ButtonCutom({ label, onClickItem, activeTab }) {
  const onClickTab = () => {
    onClickItem(label);
  };
  return (
    <ColorButton
      onClick={onClickTab}
      disableElevation
      variant={label === activeTab && 'contained'}
    >
      {label}

    </ColorButton>
  );
}
