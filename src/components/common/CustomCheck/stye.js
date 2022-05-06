import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const CustomFormControl = styled(FormControlLabel)(({ active }) => ({
  margin: '0.5rem',
  borderRadius: '0.5rem',
  transition: 'all 0.3s ease-in-out',
  padding: '0 0.4rem',
  textAlign: 'center',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: active ? '#0033A0' : '#fff',
}));

export const CustomCheck = styled(Checkbox)({
  margin: '0px',
  padding: '0px',
  display: 'none',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#000',
  },
  '&:focus': {
    backgroundColor: '#fff',
    color: '#000',
  },
});
