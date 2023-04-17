import { useField } from 'formik';
import React from 'react';
import { InputBase, InputLabel } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginBottom: theme.spacing(1),
  },
  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: 20,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    boxShadow: '0px 2px 20px #ECF0F1',
    border: '1px solid #ecf0f1',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

function InputField(props) {

  const { type, label, ...rest } = props;
  const [field, meta] = useField(props);

  const _renderHelperText = () => {
    const [touched, error] = lodash.at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  return (
    <>
      <InputLabel
        shrink
        htmlFor='bootstrap-input'
        sx={{ color: '#0033a0', padding: '0 1rem', fontSize: '1rem', fontWeight: 500 }}
      >
        {label}
      </InputLabel>
      <BootstrapInput
        type={type}
        error={meta.touched && meta.error}
        helperText={_renderHelperText}
        {...field}
        {...rest}
      />

    </>
  );
}

export default InputField;
