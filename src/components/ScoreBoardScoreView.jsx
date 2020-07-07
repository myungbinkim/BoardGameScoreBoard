/* react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/* component */
import ScoreInput from './ScoreBoardScoreInput';

const ScoreView = (props) => {
  const {
    name,
    playerState,
    show,
    handleClose,
    handleSave,
  } = props;

  const [thisRoundScore, setThisRoundScore] = useState(playerState.prevScore);
  const onClickSave = () => {
    handleSave(thisRoundScore);
    setThisRoundScore(0);
  };

  return (
    <Modal
      animation={false}
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
      <Modal.Body>
        <p className="text-muted mb-0 text-center">
          <small>
            이번 라운드 점수
          </small>
        </p>
        <h2 className="mb-3 font-weight-bold text-center">
          {thisRoundScore}
        </h2>

        <ScoreInput
          thisRoundScore={thisRoundScore}
          setThisRoundScore={setThisRoundScore}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClickSave}>
          저장
        </Button>
        <Button variant="secondary" onClick={() => handleClose()}>
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
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ScoreView;
