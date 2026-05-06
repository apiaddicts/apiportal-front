import React from 'react';
import classes from './purchase-stepper.module.scss';

const STATE_DONE = 'done';
const STATE_ACTIVE = 'active';
const STATE_PENDING = 'pending';

function StepDot({ index, state }) {
  if (state === STATE_DONE) return <span className={`${classes.dot} ${classes.dotDone}`}>✓</span>;
  if (state === STATE_ACTIVE) return <span className={`${classes.dot} ${classes.dotActive}`}>{index}</span>;
  return <span className={`${classes.dot} ${classes.dotPending}`}>{index}</span>;
}

function PurchaseStepper({ steps }) {
  return (
    <ol className={classes.stepper}>
      {steps.map((step, i) => {
        const stateCls =
          step.state === STATE_DONE ? classes.stepDone
            : step.state === STATE_ACTIVE ? classes.stepActive
            : classes.stepPending;
        return (
          <li key={step.key} className={`${classes.step} ${stateCls}`}>
            <StepDot index={i + 1} state={step.state} />
            <div className={classes.text}>
              <span className={classes.title}>{step.title}</span>
              {step.hint && <span className={classes.hint}>{step.hint}</span>}
            </div>
            {i < steps.length - 1 && <span className={classes.line} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

export default PurchaseStepper;
