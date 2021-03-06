import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Rank from '../components/Rank';

export default function Home() {
  return (
    <div>
      <Rank />
      <Link to="/scoreboard">
        <Button variant="success" size="lg" block>SCOREBOARD</Button>
      </Link>
    </div>
  );
}
