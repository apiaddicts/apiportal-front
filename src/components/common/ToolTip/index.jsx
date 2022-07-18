import React from 'react';
import { Button, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import ContainerIcon from './style';

function CustomTooltip({ text = 'Text', children }) {
  return (
    <Tooltip disableFocusListener disableTouchListener TransitionComponent={Zoom} title={text} arrow>
      <ContainerIcon>
        <Button>{children}</Button>
      </ContainerIcon>
    </Tooltip>
  );
};

export default CustomTooltip;
