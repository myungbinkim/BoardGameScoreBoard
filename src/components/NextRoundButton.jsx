/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

/* react-redux */
import { useDispatch } from 'react-redux';
import { setScores } from '../redux/players';

const getTotalScore = (members, playerStates) => {
  let totalScore = 0;
  members.forEach((member) => {
    playerStates.forEach((val, i) => {
      if (i === member.id) {
        totalScore += val.currentScore;
      }
    });
  });
  return totalScore;
};

const checkGameOver = (teamList, playerStates, maxScore) => {
  let isOver = false;
  teamList.forEach((team) => {
    const totalScore = getTotalScore(team.members, playerStates);
    isOver = isOver || (totalScore > maxScore);
  });
  return isOver;
};

const checkAllSelected = (playerStates) => (
  playerStates.reduce((acc, cur) => acc && cur.selected)
);

const getFinalScores = (playerStates) => {
  const finalScores = [];
  playerStates.forEach((state, id) => {
    const score = state.currentScore;
    finalScores.push({ id, score });
  });
  return finalScores;
};

const NextRoundButton = (props) => {
  const {
    teamList,
    playerStates,
    updateAllStates,
    maxScore,
    round,
    setRound,
  } = props;

  const nextRound = round + 1;
  const isOver = checkGameOver(teamList, playerStates, maxScore);
  const isAllSelected = checkAllSelected(playerStates);

  const dispatch = useDispatch();

  if (isAllSelected && isOver) {
    return (
      <Link to="/game-over">
        <Button
          variant="danger"
          size="lg"
          onClick={() => dispatch(setScores(getFinalScores(playerStates)))}
          block
        >
          Game Over
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="info"
      size="lg"
      onClick={() => {
        updateAllStates();
        setRound(nextRound);
      }}
      disabled={!isAllSelected}
      block
    >
      Next Round
    </Button>
  );
};

NextRoundButton.propTypes = {
  teamList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      members: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  ).isRequired,
  playerStates: PropTypes.arrayOf(PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  updateAllStates: PropTypes.func.isRequired,
  maxScore: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
};

export default NextRoundButton;
