import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from './screens/Home';
import Participatant from './screens/Participatant';
import TeamMatching from './screens/TeamMatching';
import ScoreBoard from './screens/ScoreBoard';
import Statistics from './screens/Statistics';
import GameOver from './screens/GameOver';

import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container style={{ width: '100vw', marginTop: '60px', marginBottom: '90px' }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/participatant">
            <Participatant />
          </Route>
          <Route path="/team-matching">
            <TeamMatching />
          </Route>
          <Route path="/score-board">
            <ScoreBoard />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/game-over">
            <GameOver />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
