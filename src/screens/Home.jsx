import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ParticipatantInfo from '../components/modules/ParticipatantInfo';
import ParticipatantContainer from '../components/containters/ParticipatantContainer';

export default function Home() {
  const store = createStore(ParticipatantInfo);
  return (
    <>
      <Card border="secondary" className="mt-3">
        <Card.Body>
          <Provider store={store}>
            <ParticipatantContainer />
          </Provider>
        </Card.Body>
        <Card.Body>
          <Card.Title>6nimmt</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Team Matching
          </Card.Subtitle>
          <Button variant="success">START</Button>
          <Button variant="primary">RANK</Button>
        </Card.Body>
      </Card>
    </>
  );
}
