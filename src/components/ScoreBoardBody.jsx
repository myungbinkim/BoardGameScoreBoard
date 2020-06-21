/* react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* bootstraps */
import Container from 'react-bootstrap/Container';

/* components */
import NextRoundButton from './NextRoundButton';
import Team from './ScoreBoardTeam';

const useStateArray = (size, initialState) => {
  const initialArray = Array.from(Array(size), () => initialState);
  const [stateArray, setStateArray] = useState(initialArray);
  const setStateAt = (idx, state) => {
    const newStateArray = stateArray.map((val, i) => {
      if (i === idx) {
        return state;
      }
      return val;
    });
    setStateArray(newStateArray);
  };
  const updateAllStates = () => {
    const newStateArray = stateArray.map((val) => (
      {
        ...val,
        prevScore: val.currentScore,
        selected: false,
      }
    ));
    setStateArray(newStateArray);
  };
  return [stateArray, setStateAt, updateAllStates];
};

const ScoreBoardBody = (props) => {
  const { round, setRound } = props;

  /* redux */
  const maxScore = useSelector((state) => state.game.maxScore);
  const teamList = useSelector((state) => state.players.teamList);
  const playerCount = useSelector((state) => state.players.playerList).length;

  /* player states */
  const initialState = {
    currentScore: 0,
    prevScore: 0,
    selected: false,
  };
  const [
    playerStates,
    setPlayerStateAt,
    updateAllStates,
  ] = useStateArray(playerCount, initialState);

  return (
    <Container>
      {
        teamList.map((team) => (
          <Team
            key={team.id}
            team={team}
            playerStates={playerStates}
            setPlayerStateAt={setPlayerStateAt}
            maxScore={maxScore}
          />
        ))
      }
      <NextRoundButton
        teamList={teamList}
        playerStates={playerStates}
        updateAllStates={updateAllStates}
        maxScore={maxScore}
        round={round}
        setRound={setRound}
      />
    </Container>
  );
};

ScoreBoardBody.propTypes = {
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
};

export default ScoreBoardBody;
