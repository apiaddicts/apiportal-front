import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Barlow from '../../../static/fonts/FS Joey Regular.ttf';

const TypographyMUI = styled(Typography)({
  fontFamily: 'Barlow',
  marginBottom: '1rem',
  fontWeight: '700',
  fontSize: '2.125rem',
  lineHeight: '45.14px',
  color: '#0033A0',
  src: Barlow,
});

export default TypographyMUI;

export const TypographyUI = styled(TypographyMUI)({
  marginBottom: '0',
  lineHeight: '20px',
  fontSize: '16px',
  color: '#53565A',
});
