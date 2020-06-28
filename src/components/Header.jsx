import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand> Boardgame Scoreboard </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Link to="/">
          HOME
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
