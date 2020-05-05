import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand> Boardgame Scoreboard </Navbar.Brand>
    </Navbar>
  );
}
