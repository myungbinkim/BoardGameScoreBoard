/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Dropdown from 'react-bootstrap/Dropdown';

/* react-redux */
import { useDispatch } from 'react-redux';
import { setSelected, setScore } from '../redux/players';

const isPlayerSelected = (id, selectedList) => (
  selectedList.find((x) => (x.id === id)).selected
);

const PlayerButton = (props) => {
  const { player, selectedList } = props;
  const dispatch = useDispatch();
  const selected = isPlayerSelected(player.id, selectedList);
  const variant = selected ? 'success' : 'secondary';

  const handleSelect = (eventKey) => {
    const value = Number(eventKey);
    dispatch(setScore(player.id, value));
    if (!selected) {
      dispatch(setSelected(player.id));
    }
  };
  const scoreArray = Array.from(new Array(101), (x, i) => i);

  return (
    <Dropdown key={player.name} onSelect={(eventKey) => handleSelect(eventKey)}>
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
  selectedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
};

export default PlayerButton;
