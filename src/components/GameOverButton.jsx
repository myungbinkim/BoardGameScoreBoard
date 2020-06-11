/* react */
import React from 'react';

/* react-bootstrap */
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const GameOverButton = () => (
  <Link to="/game-over">
    <Button variant="danger" size="lg" block> Game Over </Button>
  </Link>
);

export default GameOverButton;
