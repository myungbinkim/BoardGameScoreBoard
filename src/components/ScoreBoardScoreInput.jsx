/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';

const PlusMinus = (props) => {
  const { thisRoundScore, setThisRoundScore } = props;
  const handlePlusMinus = (value) => {
    const newScore = thisRoundScore + value > -1 ? thisRoundScore + value : 0;
    setThisRoundScore(newScore);
  };

  return (
    <Container>
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
      step="5"
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

const ScoreInput = (props) => {
  const { thisRoundScore, setThisRoundScore } = props;

  return (
    <>
      <Slider thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
      <PlusMinus thisRoundScore={thisRoundScore} setThisRoundScore={setThisRoundScore} />
    </>
  );
};
ScoreInput.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  setThisRoundScore: PropTypes.func.isRequired,
};

export default ScoreInput;
