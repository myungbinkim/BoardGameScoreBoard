/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/* component */
import ScoreToolbar from './ScoreBoardScoreToolbar';
import ScoreInput from './ScoreBoardScoreInput';

const ScoreView = (props) => {
  const {
    name,
    playerState,
    setPlayerState,
    show,
    handleClose,
    handleSave,
  } = props;

  const totalScore = playerState.currentScore;
  const thisRoundScore = playerState.currentScore - playerState.prevScore;
  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isInteger(value)) {
      const newScore = playerState.prevScore + value;
      setPlayerState({
        ...playerState,
        currentScore: newScore,
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="text-muted mb-0">
          <small>
            Total Score
          </small>
        </p>
        <h2 className="mb-3 font-weight-bold">
          {totalScore}
        </h2>
        <ScoreToolbar playerState={playerState} setPlayerState={setPlayerState} />
        <ScoreInput thisRoundScore={thisRoundScore} handleChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          저장
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
ScoreView.propTypes = {
  name: PropTypes.string.isRequired,
  playerState: PropTypes.shape({
    currentScore: PropTypes.number.isRequired,
    prevScore: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  setPlayerState: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ScoreView;
