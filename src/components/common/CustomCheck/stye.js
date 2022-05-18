import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from '@mui/material';

export const FormControlMain = styled(FormControl)({
  '& .MuiFormControlLabel-root': {
    padding: '0 0.8rem',
    marginLeft: '0px',
    '& .MuiFormControlLabel-label': {
      fontSize: '1rem',
    },
  },
});

export const CustomFormControl = styled(FormControlLabel)(({ active }) => ({
  width: '100%',
  display: 'block',
  transition: 'all 0.3s ease-in-out',
  textAlign: 'center',
  cursor: 'pointer',
  padding: '0 0.8rem',
  backgroundColor: active ? '#0033A0' : '#fff',
  color: active ? '#fff' : '#0033A0',
}));

export const CustomCheck = styled(Checkbox)({
  margin: '0px',
  padding: '0px',
  display: 'none',
});

