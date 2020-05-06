import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <Card border="secondary" className="mt-3">
      <Card.Body>
        <Card.Title>6nimmt</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Team Matching</Card.Subtitle>
        <Button variant="success">START</Button>
        <Button variant="primary">RANK</Button>
      </Card.Body>
    </Card>
  );
}
