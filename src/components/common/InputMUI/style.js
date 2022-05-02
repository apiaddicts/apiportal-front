import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Input = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0033A0',
    position: 'absolute',
    top: '-15px',
  },
  margin: '0.8rem 0',
  marginTop: '1.8rem',
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
      padding: '0.8rem 1rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
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

});

export default Input;
