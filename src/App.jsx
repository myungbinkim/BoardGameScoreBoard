import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from './screens/Home';
import Admin from './screens/Admin';
import Participatant from './screens/Participatant';
import TeamMatching from './screens/TeamMatching';
import ScoreBoard from './screens/ScoreBoard';
import Statistics from './screens/Statistics';
import GameOver from './screens/GameOver';
import UserScoreBoard from './screens/UserScoreBoard';

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
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/scoreboard">
            <UserScoreBoard />
          </Route>
          <Route path="/admin/participatant">
            <Participatant />
          </Route>
          <Route path="/admin/team-matching">
            <TeamMatching />
          </Route>
          <Route path="/admin/score-board">
            <ScoreBoard />
          </Route>
          <Route path="/admin/game-over">
            <GameOver />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
