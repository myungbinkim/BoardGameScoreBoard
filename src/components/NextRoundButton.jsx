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
    totalScore += playerStates.get(member.id).currentScore;
  });
  return totalScore;
};

const checkGameOver = (teamList, playerStates, maxScore) => {
  let isOver = false;

  if (maxScore <= 67) {
    return true;
  }

  teamList.forEach((team) => {
    const totalScore = getTotalScore(team.members, playerStates);
    isOver = isOver || (totalScore > maxScore);
  });
  return isOver;
};

const checkAllSelected = (playerStates) => {
  const stateArray = Array.from(playerStates.values());
  return stateArray.reduce((acc, cur) => acc && cur.selected);
};

const getThisRoundScores = (playerStates) => {
  const thisRoundScores = [];
  playerStates.forEach((state, id) => {
    const score = state.currentScore - state.prevScore;
    thisRoundScores.push({ id, score });
  });
  return thisRoundScores;
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
      <Link to="/admin/game-over">
        <Button
          variant="danger"
          size="lg"
          onClick={() => dispatch(setScores(getThisRoundScores(playerStates)))}
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
        dispatch(setScores(getThisRoundScores(playerStates)));
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
  playerStates: PropTypes.instanceOf(Map).isRequired,
  updateAllStates: PropTypes.func.isRequired,
  maxScore: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
};

export default NextRoundButton;
