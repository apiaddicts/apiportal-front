/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ContainerSteps, StepperUI, StepUI } from './style';
import InformationFormModel from '../../../pages/private/Apps/FormModel/InformationFormModel';
import Information from '../../../pages/private/Apps/Forms/Information';
import Apis from '../../../pages/private/Apps/Forms/Apis';
import Connection from '../../../pages/private/Apps/Forms/Connection';
import InformationInitialValues from '../../../pages/private/Apps/FormModel/InformationInitialValues';
import InformationSchema from '../../../pages/private/Apps/FormModel/InformationSchema';
import appsActions from '../../../redux/actions/appsActions';
import { useTranslation } from 'react-i18next';
import { showSelectedApis } from '../../../redux/actions/libraryAction';

const { formId, formField } = InformationFormModel;
let selApis = [];
function _renderStepContent(step) {
  const [selectedApis, setSelectedApis] = useState([]);
  selApis = selectedApis;
  switch (step) {
    case 0:
      return <Information formField={formField} />;
    case 1:
      return <Apis formField={formField} selectedApis={selectedApis} setSelectedApis={setSelectedApis} />;
    case 2:
      return <Connection />;
    default:
      return <div />;
  }
}

export default function HorizontalStepper({
  steps,
}) {
  const { t } = useTranslation();
  const { createdApp, error, addApisRes, activeStep } = useSelector((state) => state.apps);
  const [completed, setCompleted] = useState({});
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = InformationSchema[activeStep];
  const notify = (msg) => toast(msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep && !allStepsCompleted() ?
        steps.findIndex((step, i) => !(i in completed)) :
        activeStep + 1;
    dispatch(appsActions.setActiveStep(newActiveStep));
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const goBack = () => {
    navigate(-1);
  };

  const _handleSubmit = (values, actions) => {
    actions.setTouched({});
    actions.setSubmitting(false);
    if (activeStep === 0) {
      const data = {
        displayName: values.displayName,
        description: values.description,
        web: {
          redirectUris: [
            values.callback,
          ],
        },
        daysToExpirationSecret: values.expiration,
      };
      dispatch(appsActions.createApp(data));
    }

    if (activeStep === 1) {
      const data = {
        applicationObjectId: createdApp.id,
        apis: values.checkApis.map((item) => item.value),
      };
      dispatch(appsActions.addApisApp(data, createdApp.id));
    }

    if (isLastStep) {
      goBack();
    }
  };

  const handleReset = () => {
    dispatch(appsActions.setActiveStep(0));
    setCompleted({});
  };

  useEffect(() => {
    if (error && Object.prototype.hasOwnProperty.call(error, 'error')) {
      if (error.error.status === 400) {
        toast(t('Stepper.verifyInsertedData'));
      } else {
        toast(error.error.statusText);
      }
      dispatch(appsActions.resetErrors());
    }
  }, [error]);

  useEffect(() => {
    if (createdApp && Object.keys(createdApp).length > 0) {
      handleComplete();
    }

    if (addApisRes === 'SUCCESS') {
      handleComplete();
    }
  }, [createdApp, addApisRes]);

  return (
    <ContainerSteps elevation={24}>
      <StepperUI
        nonLinear
        activeStep={activeStep}
      >
        {steps.map((label, index) => (
          <StepUI key={label} completed={completed[index]}>
            <StepButton color='inherit' disabled>
              {label}
            </StepButton>
          </StepUI>
        ))}
      </StepperUI>
      <ContainerSteps>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {t('Stepper.allStepsCompleted')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>{t('Stepper.reset')}</Button>
            </Box>
          </>
        ) : (
          <ContainerSteps sx={{ paddingX: 5 }}>
            <Formik
              initialValues={InformationInitialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form id={formId}>
                  {_renderStepContent(activeStep)}
                  <div className='stepper__wrapper__actions'>
                    <Button type='submit' disabled={isSubmitting} className='custom__btn custom__btn__primary stepper__wrapper__actions__next'>
                      {activeStep === 0 ?
                        t('Stepper.save') :
                        isLastStep ?
                          t('Stepper.finish') :
                          t('Stepper.next')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </ContainerSteps>
        )}
      </ContainerSteps>
    </ContainerSteps>
  );
}
