import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  overflow: 'hidden',
  borderRadius: '100%',
  border: '2px solid #0033A0',
  position: 'absolute',
  top: '-2px',
  right: '-20px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '13px',
});

export default ContainerIcon;
