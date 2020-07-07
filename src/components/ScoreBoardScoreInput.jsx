/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const PlusMinus = (props) => {
  const { thisRoundScore, setThisRoundScore } = props;
  const handlePlusMinus = (value) => {
    const newScore = thisRoundScore + value > -1 ? thisRoundScore + value : 0;
    setThisRoundScore(newScore);
  };

  return (
    <Container className="mb-3">
      <Row>
        <Col>
          <Button
            className="ml-auto mr-auto"
            variant="outline-info"
            onClick={() => handlePlusMinus(-1)}
            block
          >
            -
          </Button>
        </Col>
        <Col>
          <Button
            className="ml-auto mr-auto"
            variant="outline-info"
            onClick={() => handlePlusMinus(1)}
            block
          >
            +
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
PlusMinus.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  setThisRoundScore: PropTypes.func.isRequired,
};

const Slider = (props) => {
  const { thisRoundScore, setThisRoundScore } = props;

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isInteger(value)) {
      setThisRoundScore(value);
    }
  };

  return (
    <RangeSlider
      value={thisRoundScore}
      size="lg"
      variant="info"
      step={5}
      tooltip="off"
      block
      onChange={(e) => handleChange(e)}
    />
  );
};
Slider.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  setThisRoundScore: PropTypes.func.isRequired,
};

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
        <InputGroup.Text>직접입력</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        type="number"
        onChange={(e) => handleChange(e)}
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
      <Slider thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
      <PlusMinus thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
      <InputByHand thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
    </>
  );
};
ScoreInput.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  setThisRoundScore: PropTypes.func.isRequired,
};

export default ScoreInput;
