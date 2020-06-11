/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Button from 'react-bootstrap/Button';

/* react-redux */
import { useDispatch } from 'react-redux';
import { resetSelected } from '../redux/players';

const NextRoundButton = (props) => {
  const { round, setRound, allSelected } = props;
  const dispatch = useDispatch();
  const nextRound = round + 1;

  return (
    <Button
      variant="info"
      size="lg"
      onClick={() => {
        dispatch(resetSelected());
        setRound(nextRound);
      }}
      disabled={!allSelected}
      block
    >
      Next Round
    </Button>
  );
};
NextRoundButton.propTypes = {
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
  allSelected: PropTypes.bool.isRequired,
};

export default NextRoundButton;
