/* react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';

const CheckButton = (props) => {
  const [checked, setChecked] = useState(false);
  const { playerState, setPlayerState } = props;
  const handleCheck = () => {
    setChecked(true);
    setPlayerState({
      ...playerState,
      selected: true,
    });
  };

  return (
    <ToggleButton
      type="checkbox"
      variant=""
      checked={checked}
      onChange={() => handleCheck()}
      size="sm"
    />
  );
};
CheckButton.propTypes = {
  playerState: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  setPlayerState: PropTypes.func.isRequired,
};

const ScoreButtonGroup = (props) => {
  const { playerState, setPlayerState, offset } = props;
  const increaseCurrentScore = (score) => {
    const newScore = playerState.currentScore + score;
    setPlayerState({
      ...playerState,
      currentScore: newScore,
      selected: true,
    });
  };
  const decreaseCurrentScore = (score) => {
    const inputScore = playerState.currentScore - score;
    const newScore = inputScore < playerState.prevScore ? playerState.prevScore : inputScore;
    const selected = newScore > playerState.prevScore;

    setPlayerState({
      ...playerState,
      currentScore: newScore,
      selected,
    });
  };

  return (
    <ButtonGroup className="mr-2" size="sm">
      <Button variant="outline-info" onClick={() => increaseCurrentScore(offset)}>
        {`+${offset}`}
      </Button>
      <Button variant="outline-info" onClick={() => decreaseCurrentScore(offset)}>
        {`-${offset}`}
      </Button>
    </ButtonGroup>
  );
};
ScoreButtonGroup.propTypes = {
  playerState: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  setPlayerState: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};

const PlayerButton = (props) => {
  const [show, setShow] = useState(false);
  const { name, playerState, setPlayerState } = props;

  const handleCheck = () => {
    setPlayerState({
      ...playerState,
      selected: true,
    });
  };
  const handleClose = () => { setShow(false); };
  const handleClick = () => { setShow(true); };

  return (
    <>
      <ButtonGroup className="mr-2" size="sm">
        <Button
          style={{
            width: '56.64px',
          }}
          variant="primary"
          onClick={handleClick}
        >
          {name}
        </Button>
        <ToggleButton
          className="mx-0 my-0"
          type="checkbox"
          variant="info"
          checked={playerState.selected}
          onChange={() => handleCheck()}
        />
      </ButtonGroup>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {`${name} 현재 스코어`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {playerState.currentScore}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

PlayerButton.propTypes = {
  name: PropTypes.string.isRequired,
  playerState: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  setPlayerState: PropTypes.func.isRequired,
};

const PlayerCell = (props) => {
  const { player, playerStates, setPlayerStateAt } = props;
  const playerState = playerStates.get(player.id);
  const setPlayerState = (state) => setPlayerStateAt(player.id, state);

  return (
    <ButtonToolbar>
      <PlayerButton name={player.name} playerState={playerState} setPlayerState={setPlayerState} />
      <ScoreButtonGroup playerState={playerState} setPlayerState={setPlayerState} offset={10} />
      <ScoreButtonGroup playerState={playerState} setPlayerState={setPlayerState} offset={1} />
    </ButtonToolbar>
  );
};
PlayerCell.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  playerStates: PropTypes.instanceOf(Map).isRequired,
  setPlayerStateAt: PropTypes.func.isRequired,
};

export default PlayerCell;
