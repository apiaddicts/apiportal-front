import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

export const ContainerSteps = styled(Paper)({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  marginTop: '24px',
  borderRadius: '0.5rem',
});

export const StepperUI = styled(Stepper)({
  backgroundColor: '#0033a01f',
  padding: '1rem 3rem',
});

export const StepUI = styled(Step)({
  color: '#fff',
});
