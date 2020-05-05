import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from './screens/Home';
import TeamMatching from './screens/TeamMatching';
import Rank from './screens/Rank';

import Header from './components/Header';
import Footer from './components/Footer';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container sytle={{ width: '100vw', marginTop: '80px', marginBottom: '120px' }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tm">
            <TeamMatching />
          </Route>
          <Route path="/rank">
            <Rank />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
