import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand href="/"> 6NIMMT </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/rank">Statistics</Nav.Link>
      </Nav>
    </Navbar>
  );
}
