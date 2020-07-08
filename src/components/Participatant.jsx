import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { selectPart } from '../redux/participatants';

const Participatant = ({ part }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(true);
  return (
    <>
      <Button
        style={{
          height: '80px',
          textAlign: 'center',
        }}
        variant={color ? 'primary' : 'secondary'}
        block
        onClick={() => {
          dispatch(selectPart(part.id));
          setColor(!color);
        }}
      >
        {part.name}
      </Button>
      {' '}
    </>
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
