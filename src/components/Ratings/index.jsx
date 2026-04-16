import PropTypes from 'prop-types';
import classes from './ratings.module.scss';

const gaugeAngle = (grade) => {
  const pct = { A: 100, B: 80, C: 60, D: 40, E: 20 }[grade];
  return pct === undefined ? 0 : (pct / 100) * 180 - 90;
};

function Ratings({ ratings, title, subtitle, labels }) {
  const ratingKeys = [
    { key: 'globalRating', label: labels.globalRating },
    { key: 'definitionRating', label: labels.definitionRating },
    { key: 'securityRating', label: labels.securityRating },
    { key: 'qualityRating', label: labels.qualityRating },
  ];

  const descriptions = {
    definitionRating: {
      A: 'Clear, consistent, production-ready design',
      B: 'Well structured with minor inconsistencies',
      C: 'Usable but lacks consistency or clarity',
      D: 'Poor structure and weak documentation',
      E: 'Broken design; inconsistent and unclear',
    },
    securityRating: {
      A: 'No critical risks strong protection',
      B: 'Minor issues generally secure system',
      C: 'Moderate risks potential vulnerabilities exist',
      D: 'High risk requires immediate fixes',
      E: 'Critical vulnerabilities system highly exposed',
    },
    qualityRating: {
      A: 'Reliable well tested fast performance',
      B: 'Stable system good test coverage',
      C: 'Functional but testing gaps performance',
      D: 'Unstable frequent failures poor performance',
      E: 'Broken unreliable system critical failures',
    }
  };

  return (
    <div className={classes.ratings__wrapper}>
      <h2 className={classes.ratings__title}>{title}</h2>
      {subtitle && <p className={classes.ratings__subtitle}>{subtitle}</p>}
      <div className={classes.ratings__row}>
        {ratingKeys.map(({ key, label }) => {
          const grade = ratings[key];
          return (
            <div key={key} className={classes.ratings__gauge__item}>
              <div className={classes.gauge}>
                <div className={classes.gauge__arc} />
                <div
                  className={classes.gauge__needle}
                  style={{ transform: `translateX(-50%) rotate(${gaugeAngle(grade)}deg)` }}
                />
                <div className={classes.gauge__center} />
              </div>
              <span className={classes.ratings__gauge__grade}>{grade || '-'}</span>
              <span className={classes.ratings__gauge__label}>{label}</span>
              <span className={classes.ratings__gauge__desc}>
                {descriptions[key]?.[grade] || ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Ratings.propTypes = {
  ratings: PropTypes.shape({
    globalRating: PropTypes.string,
    definitionRating: PropTypes.string,
    securityRating: PropTypes.string,
    qualityRating: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  labels: PropTypes.shape({
    globalRating: PropTypes.string.isRequired,
    definitionRating: PropTypes.string.isRequired,
    securityRating: PropTypes.string.isRequired,
    qualityRating: PropTypes.string.isRequired,
  }).isRequired,
};

Ratings.defaultProps = {
  subtitle: '',
};

export default Ratings;
