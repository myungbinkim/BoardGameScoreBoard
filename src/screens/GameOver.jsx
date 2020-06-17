/* react */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* bootstrap */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { replaySelected } from '../redux/players';
import postResult from '../components/PostResult';

const GameOver = () => {
  const teams = useSelector((state) => state.players.teamList);
  const scores = useSelector((state) => state.players.scoreList);
  const players = useSelector((state) => state.players.playerList);
  const dispatch = useDispatch();

  useEffect(() => postResult(teams, scores, players));

  const worstTeam = teams.map((team) => ({
    score: team.members.reduce((acc, m) => {
      let total = acc;
      scores.forEach((entry) => {
        if (entry.id === m.id) {
          total += entry.score;
        }
      });
      return total;
    }, 0),
    ...team,
  })).sort((a, b) => b.score - a.score);

  return (
    <Container>
      <Link to="/score-board">
        <Button
          variant="warning"
          onClick={() => {
            dispatch(replaySelected());
          }}
        >
          REPLAY
        </Button>
        {' '}
      </Link>
      <Link to="/">
        <Button variant="danger">HOME</Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>PLAYER</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {worstTeam.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.members.map((m) => m.name).join(', ')}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GameOver;
