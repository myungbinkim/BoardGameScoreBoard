import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

import TeamProgressBar from '../components/TeamProgressBar';

const ScoreBoard = () => {
  const [scoreBoard, setScoreBoard] = useState({ teamlist: [], maxscore: -1 });
  useEffect(
    () => {
      setTimeout(() => (
        fetch('api/scoreboard').then((response) => response.json()).then((v) => setScoreBoard(v))
      ), 2000);
    },
  );
  if (scoreBoard.maxscore === -1) {
    return <>Now Loading...</>;
  }
  return (
    <>
      <Alert variant="primary">
        {`Max Score : ${scoreBoard.maxscore}`}
      </Alert>
      {
        scoreBoard.teamlist.map((team) => (
          <TeamProgressBar key={team.id} maxscore={scoreBoard.maxscore} members={team.members} />
        ))
      }
    </>
  );
};

export default ScoreBoard;
