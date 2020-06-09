/* react */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

/* bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const getScoreList = (scores, players) => (
  players.map((player) => {
    let score = 0;
    scores.forEach((entry) => {
      if (entry.id === player.id) {
        score = entry.score;
      }
    });
    return { name: player.name, score };
  })
);

const postResult = (teams, scores, players) => {
  const teamList = teams.map((team) => ({ members: team.members }));
  const scoreList = getScoreList(scores, players);

  const body = {
    'team-list': teamList,
    'score-list': scoreList,
  };

  const request = (data) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    fetch(`/api/scores?date=${year}${month}${day}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  };

  request(body);
};

const GameOver = () => {
  const teams = useSelector((state) => state.players.teamList);
  const scores = useSelector((state) => state.players.scoreList);
  const players = useSelector((state) => state.players.playerList);

  useEffect(() => postResult(teams, scores, players));

  return (
    <Container>
      <Row>
        GAME OVER :)
      </Row>
    </Container>
  );
};

export default GameOver;
