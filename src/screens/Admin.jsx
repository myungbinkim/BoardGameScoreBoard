import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Rank from '../components/Rank';

export default function Home() {
  return (
    <div>
      <Rank />
      <Link to="/admin/participatant">
        <Button variant="success" size="lg" block>START</Button>
      </Link>
    </div>
  );
}
