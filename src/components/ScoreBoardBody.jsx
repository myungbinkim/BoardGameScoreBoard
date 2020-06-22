/* react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* bootstraps */
import Container from 'react-bootstrap/Container';

/* components */
import NextRoundButton from './NextRoundButton';
import Team from './ScoreBoardTeam';

const usePlayerStates = (playerList, initialState) => {
  const initialMap = new Map();
  playerList.forEach((player) => {
    initialMap.set(player.id, initialState);
  });

  const [stateMap, setStateMap] = useState(initialMap);
  const setStateAt = (key, state) => {
    setStateMap(new Map(stateMap.set(key, state)));
  };
  const updateAllStates = () => {
    stateMap.forEach((value, key, map) => {
      map.set(key, {
        ...value,
        prevScore: value.currentScore,
        selected: false,
      });
    });
    const newStateMap = new Map(stateMap);
    setStateMap(newStateMap);
  };
  return [stateMap, setStateAt, updateAllStates];
};

const ScoreBoardBody = (props) => {
  const { round, setRound } = props;

  /* redux */
  const maxScore = useSelector((state) => state.game.maxScore);
  const teamList = useSelector((state) => state.players.teamList);
  const playerList = useSelector((state) => state.players.playerList);

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
  ] = usePlayerStates(playerList, initialState);

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
