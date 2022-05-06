import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Input = styled(TextField)(({ value }) => ({
  margin: '0.8rem 0',
  '& label.Mui-focused': {
    color: '#0033A0',
    position: 'absolute',
    top: '-15px',
  },
  '& label': {
    top: value ? '-15px' : '-8px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
      transition: 'all 0.3s ease-in-out',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-root': {
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '40px',
    boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
    '&:hover': {
      boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
      border: 'none',
    },
    '& .MuiInputBase-input': {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      color: '#2C3E50',
      border: 'none',
      borderRadius: '40px',
      '&:hover': {
        border: 'none',
      },
      '&::placeholder': {
        color: '#2C3E50',
        fontWeight: '100',
        fontSize: '0.9rem',
      },
    },
  },
}));

export default Input;

export const InputSelect = styled(Input)(({ value }) => ({
  '& label': {
    top: value ? '-15px' : '-8px',
  },
  ' & label.Mui-selected': {
    top: '-5px',
  },
}));

export const ContainerInput = styled(Box)({
  marginTop: '1.8rem',
  flexDirection: 'row',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});
export const ContainerIcon = styled(Box)(({ icon }) => ({
  cursor: 'pointer',
  position: 'absolute',
  fontSize: '1.2rem',
  opacity: '0.5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '25px',
  height: '25px',
  right: icon ? '40px' : '15px',
  zIndex: '9999',
  // hover
  '&:hover': {
    opacity: '1',
  },
}));

export const InputDisabled = styled(Input)({
  '& label': {
    top: '-15px',
  },
});

