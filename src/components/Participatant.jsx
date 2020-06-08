import React from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { selectPart } from '../redux/participatants';

const Participatant = ({ part }) => {
  const dispatch = useDispatch();
  return (
    <Toast show={part.selected} onClose={() => dispatch(selectPart(part.id))}>
      <Toast.Header>
        <strong className="mr-auto">{part.name}</strong>
      </Toast.Header>
      <Toast.Body>승:0 / 패:0</Toast.Body>
    </Toast>
  );
};

Participatant.propTypes = {
  part: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Participatant;
