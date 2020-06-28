/* react */
import React, { useState } from 'react';

/* bootstraps */
import Container from 'react-bootstrap/Container';

/* components */
import Header from '../components/ScoreBoardHeader';
import ScoreBoardBody from '../components/ScoreBoardBody';

const ScoreBoard = () => {
  /* state */
  const [round, setRound] = useState(1);

  return (
    <Container
      style={{ paddingLeft: 0, paddingRight: 0 }}
      fluid="true"
    >
      <Header round={round} />
      <ScoreBoardBody round={round} setRound={setRound} />
    </Container>
  );
};

export default ScoreBoard;
