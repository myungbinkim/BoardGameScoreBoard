/* react */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { replaySelected } from '../redux/players';

const getTeamList = (teams) => (
  teams.map((team) => (team.members.map((member) => member.name)))
);

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

const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const request = (data, date) => {
  fetch(`/api/scores?date=${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((response) => (response.json()))
    .then((okay) => { window.console.log(okay); });
};

const postResult = (teams, scores, players) => {
  const teamList = getTeamList(teams);
  const scoreList = getScoreList(scores, players);
  request({ 'team-list': teamList, 'score-list': scoreList }, getTodaysDate());
};

const GameOver = () => {
  const teams = useSelector((state) => state.players.teamList);
  const scores = useSelector((state) => state.players.scoreList);
  const players = useSelector((state) => state.players.playerList);
  const dispatch = useDispatch();

  useEffect(() => postResult(teams, scores, players));

  return (
    <Container>
      <Row>
        GAME OVER :)
      </Row>
      <Link to="/score-board">
        <Button
          onClick={() => {
            dispatch(replaySelected());
          }}
        >
          REPLAY
        </Button>
      </Link>
      <Link to="/">
        <Button>HOME</Button>
      </Link>
    </Container>
  );
};

export default GameOver;
