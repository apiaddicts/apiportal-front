import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)({
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#1d57d387',
    opacity: 0.8,
  },
});

export default ColorButton;
