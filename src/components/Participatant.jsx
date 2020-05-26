import React from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

const Participatant = ({ part, selectPart }) => {
  let a = 1;
  const b = a;
  a = b;
  return (
    <Toast show={part.selected} onClose={() => selectPart(part.id)}>
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
  selectPart: PropTypes.func.isRequired,
};

export default Participatant;
