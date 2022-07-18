import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import Barlow from '../../../static/fonts/FS Joey Regular.ttf';

const Textarea = styled(TextareaAutosize)({
  fontFamily: 'Barlow',
  margin: '.8rem 0 1.8rem 0',
  width: '100%',
  maxHeight: '100px',
  border: 'none',
  borderRadius: '20px',
  boxShadow: '0px 2px 20px rgba(0,0,0,0.2)',
  padding: '10px',
  resize: 'none',
  fontSize: '16px',
  lineHeight: '24px',
  outline: 'none',
  '&:focus': {
    border: 'none',
  },
  src: Barlow,
});

export default Textarea;
