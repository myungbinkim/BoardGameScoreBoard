import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Card border="secondary" className="mt-3">
        <Card.Body>
          <Card.Title>6nimmt</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Team Matching
          </Card.Subtitle>
          <Link to="/participatant">
            <Button variant="success">START</Button>
          </Link>
          <Button variant="primary">RANK</Button>
        </Card.Body>
      </Card>
    </>
  );
}
