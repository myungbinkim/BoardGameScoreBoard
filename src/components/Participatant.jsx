import React from 'react';
import Toast from 'react-bootstrap/Toast';

const Participatant = ({ part, selectPart }) => {
  return (
    <Toast show={part.selected} onClose={() => selectPart(part.id)}>
      <Toast.Header>
        <strong className="mr-auto">{part.name}</strong>
      </Toast.Header>
      <Toast.Body>승:0/ 패:0</Toast.Body>
    </Toast>
  );
};


export default Participatant;
