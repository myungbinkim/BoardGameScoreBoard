/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import ProgressBar from 'react-bootstrap/ProgressBar';

const getTotalScore = (members, playerStates) => {
  let totalScore = 0;
  members.forEach((member) => {
    const score = playerStates.get(member.id).currentScore;
    totalScore += score;
  });
  return totalScore;
};

const ScoreBar = (props) => {
  const { members, playerStates, maxScore } = props;
  const totalScore = getTotalScore(members, playerStates);
  const percentage = Number((totalScore / maxScore) * 100);
  const now = percentage <= 100 ? percentage : 100;
  let progress = '';

  if (percentage >= 0 && percentage <= 50) {
    progress = 'success';
  } else if (percentage > 50 && percentage <= 75) {
    progress = 'warning';
  } else if (percentage > 75 && percentage <= 100) {
    progress = 'danger';
  } else {
    progress = 'dark';
  }
  return (
    <ProgressBar
      className="mb-3 mt-3"
      variant={progress}
      label={`${totalScore}`}
      now={now}
      block="true"
      animated
    />
  );
};

ScoreBar.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  playerStates: PropTypes.instanceOf(Map).isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default ScoreBar;
