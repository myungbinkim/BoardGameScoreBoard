/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const ScoreInput = (props) => {
  const { thisRoundScore, handleChange } = props;
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>직접입력</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl 
        type="number"
        placeholder={thisRoundScore}
        onChange={(e) => handleChange(e)} 
      />
    </InputGroup>
  );
};
ScoreInput.propTypes = {
  thisRoundScore: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ScoreInput;
