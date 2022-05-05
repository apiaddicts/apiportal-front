import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HorizontalStepper from '../../components/common/Stepper';
import Title from '../../components/Title/Title';
import ApisStep from './apisStep';
import Connection from './connection';
import Information from './information';
import Btn from '../../components/Buttons/Button';
import styles from './style.module.scss';
import fakeData from '../../fake-data-addapp.json';

function AddApp(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = ['Información', 'APIs', 'Conexión'];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in completed)) :
        activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    // activeStep === 0 && setCompleted({});
    console.log(activeStep);
  }, []);

  return (
    <div className={styles.container__add__app}>
      <div className='container mt-10 pt-10'>
        <Title text='Nueva App' />
      </div>
      <div className={styles.container__stepper}>
        <HorizontalStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          completed={completed}
          steps={steps}
          handleStep={handleStep}
          handleReset={handleReset}
          allStepsCompleted={allStepsCompleted}
        >
          <Box sx={{ mt: 2, mb: 1, height: '100%' }}>
            {activeStep === 0 && <Information fakeData={fakeData} styles={styles} />}
            {activeStep === 1 && <ApisStep styles={styles} />}
            {activeStep === 2 && <Connection />}
          </Box>
        </HorizontalStepper>
        <Box sx={{ mt: 10, mb: 10, width: '100%' }}>
          <div className='row flex-end pr-10'>
            <div className='flex-lg-3 flex-sm-12'>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant='caption' sx={{ display: 'inline-block' }}>
                    Step
                    {' '}
                    {activeStep + 1}
                    {' '}
                    already completed
                  </Typography>
                ) : (
                  <Btn styles='primary' onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ?
                      'Finish' :
                      'Siguinte'}
                  </Btn>
                ))}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default AddApp;
