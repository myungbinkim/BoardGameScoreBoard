import * as React from 'react';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <div className="fixed-bottom mb-0 bg-light">
      <hr />
      <Container>
        <div className="text-center text-secondary">
          <div className="font-weight-bold">
            footer1
          </div>
          <div>
            footer2
          </div>
        </div>
      </Container>
    </div>
  );
}
