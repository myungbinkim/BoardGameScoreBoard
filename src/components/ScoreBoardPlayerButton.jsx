/* react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';

/* component */
import ScoreView from './ScoreBoardScoreView';

const NameButton = (props) => {
  const {
    name,
    selected,
    handleClick,
  } = props;

  const color = selected ? 'primary' : 'secondary';

  return (
    <Button
      variant={color}
      className="mr-2"
      onClick={handleClick}
      block
    >
      {name}
    </Button>
  );
};
NameButton.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const PlayerButton = (props) => {
  const {
    player,
    playerStates,
    setPlayerStateAt,
  } = props;
  const [show, setShow] = useState(false);
  const playerState = playerStates.get(player.id);

  const setPlayerState = (state) => setPlayerStateAt(player.id, state);
  const handleSave = () => {
    setPlayerState({
      ...playerState,
      selected: true,
    });
    setShow(false);
  };

  return (
    <>
      <NameButton
        name={player.name}
        selected={playerState.selected}
        handleClick={() => setShow(true)}
      />
      <ScoreView
        name={player.name}
        playerState={playerState}
        setPlayerState={setPlayerState}
        show={show}
        handleClose={() => setShow(false)}
        handleSave={handleSave}
      />
    </>
  );
};
PlayerButton.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  playerStates: PropTypes.instanceOf(Map).isRequired,
  setPlayerStateAt: PropTypes.func.isRequired,
};

export default PlayerButton;
