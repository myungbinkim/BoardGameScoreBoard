/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const InputByHand = (props) => {
  const { setThisRoundScore } = props;

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isInteger(value)) {
      setThisRoundScore(value);
    }
  };

  return (
    <InputGroup className="mt-3">
      <InputGroup.Prepend>
        <InputGroup.Text>점수입력</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        type="number"
        onChange={(e) => handleChange(e)}
        autoFocus
      />
    </InputGroup>
  );
};
InputByHand.propTypes = {
  setThisRoundScore: PropTypes.func.isRequired,
};

const ScoreInput = (props) => {
  const { thisRoundScore, setThisRoundScore } = props;

  return (
    <>
      <InputByHand thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
    </>
  );
};
ScoreInput.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  setThisRoundScore: PropTypes.func.isRequired,
};

export default ScoreInput;
