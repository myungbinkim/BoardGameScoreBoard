import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <Card border="secondary" className="mt-3">
      <Card.Img variant="top" src="../../public/nimmt.jpeg" style={{ opacity: 0.3 }} />
      <Card.ImgOverlay className="text-center align-items-center">
        <Button size="lg" variant="success" block>START</Button>
        <Button size="lg" variant="primary" block>RANK</Button>
      </Card.ImgOverlay>
    </Card>
  );
}
