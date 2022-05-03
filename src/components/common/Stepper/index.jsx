import * as React from 'react';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContainerSteps, StepperUI, StepUI } from './style';

export default function HorizontalStepper({
  activeStep,
  setActiveStep,
  completed,
  steps,
  children,
  handleStep,
  handleReset,
  allStepsCompleted,
}) {

  return (
    <ContainerSteps elevation={24}>
      <StepperUI
        nonLinear
        activeStep={activeStep}
      >
        {steps.map((label, index) => (
          <StepUI key={label} completed={completed[index]}>
            <StepButton color='inherit' onClick={handleStep(index)}>
              {label}
            </StepButton>
          </StepUI>
        ))}
      </StepperUI>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <ContainerSteps sx={{ paddingX: 5 }}>
            {children}
          </ContainerSteps>
        )}
      </div>
    </ContainerSteps>
  );
}
