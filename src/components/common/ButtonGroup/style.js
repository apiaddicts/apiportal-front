import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonGroupCustom = styled(ButtonGroup)({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '15px',
  border: '1px solid #e0e0e0',
  // add margin to second child
  '& > *:nth-child(2n)': {
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
  },
});

export default ButtonGroupCustom;
