/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Dropdown from 'react-bootstrap/Dropdown';

const PlayerButton = (props) => {
  const { player, playerStates, setPlayerStateAt } = props;
  const setPlayerState = (state) => setPlayerStateAt(player.id, state);
  const variant = playerStates.get(player.id).selected ? 'success' : 'secondary';

  const handleSelect = (eventKey) => {
    const playerState = playerStates.get(player.id);
    const newScore = playerState.prevScore + Number(eventKey);
    setPlayerState({
      ...playerState,
      currentScore: newScore,
      selected: true,
    });
  };
  const scoreArray = Array.from(new Array(101), (x, i) => i);

  return (
    <Dropdown
      key={player.name}
      onSelect={(eventKey) => handleSelect(eventKey)}
      focusFirstItemOnShow="true"
    >
      <Dropdown.Toggle
        variant={variant}
        style={{
          width: '72px',
          marginRight: '6px',
        }}
      >
        {player.name}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          minWidth: '72px',
          width: '72px',
          maxHeight: '200px',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
        alignRight="true"
      >
        {scoreArray.map((i) => (
          <Dropdown.Item as="button" eventKey={i} key={`${player.name}-${i}`}>
            {i}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
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
