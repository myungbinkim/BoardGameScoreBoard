/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import ProgressBar from 'react-bootstrap/ProgressBar';

const ScoreBar = (props) => {
  const { totalScore, maxScore } = props;
  const percentage = Number((totalScore / maxScore) * 100);
  const now = percentage <= 100 ? percentage : 100;
  let progress = '';

  if (percentage >= 0 && percentage <= 50) {
    progress = 'success';
  } else if (percentage > 50 && percentage <= 75) {
    progress = 'warning';
  } else if (percentage > 75 && percentage <= 99) {
    progress = 'danger';
  } else {
    progress = 'dark';
  }
  return (
    <ProgressBar
      animated
      style={{
        height: '20px',
        marginBottom: '6px',
      }}
      variant={progress}
      now={now}
      label={`${totalScore}`}
      block="true"
    />
  );
};

ScoreBar.propTypes = {
  totalScore: PropTypes.number.isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default ScoreBar;
