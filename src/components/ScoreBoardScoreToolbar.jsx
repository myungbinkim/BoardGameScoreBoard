/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const ScoreButtonGroup = (props) => {
  const { playerState, setPlayerState, offset } = props;
  const increaseCurrentScore = (score) => {
    const newScore = playerState.currentScore + score;
    setPlayerState({
      ...playerState,
      currentScore: newScore,
    });
  };
  const decreaseCurrentScore = (score) => {
    const inputScore = playerState.currentScore - score;
    const newScore = inputScore < playerState.prevScore ? playerState.prevScore : inputScore;

    setPlayerState({
      ...playerState,
      currentScore: newScore,
    });
  };

  return (
    <ButtonGroup className="mr-auto ml-auto">
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

const ScoreToolbar = (props) => {
  const { playerState, setPlayerState } = props;
  return (
    <ButtonToolbar className="mb-3 d-flex">
      <ScoreButtonGroup
        playerState={playerState}
        setPlayerState={setPlayerState}
        offset={10}
      />
      <ScoreButtonGroup
        playerState={playerState}
        setPlayerState={setPlayerState}
        offset={5}
      />
      <ScoreButtonGroup
        playerState={playerState}
        setPlayerState={setPlayerState}
        offset={1}
      />
    </ButtonToolbar>
  );
};
ScoreToolbar.propTypes = {
  playerState: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  setPlayerState: PropTypes.func.isRequired,
};

export default ScoreToolbar;
