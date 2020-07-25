/* react */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* bootstrap */
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import postResult from '../components/PostResult';
import { resetScores } from '../redux/players';

const GameOver = () => {
  const teams = useSelector((state) => state.players.teamList);
  const players = useSelector((state) => state.players.playerList);
  const dispatch = useDispatch();

  useEffect(() => postResult(teams, players));

  const worstTeam = teams.map((team) => ({
    score: team.members.reduce((acc, m) => {
      let total = acc;
      players.forEach((entry) => {
        if (entry.id === m.id) {
          total += entry.score.reduce((a, c) => a + c);
        }
      });
      return total;
    }, 0),
    ...team,
  })).sort((a, b) => b.score - a.score);

  return (
    <Container>
      <Link to="/admin/score-board">
        <Button
          variant="warning"
          onClick={() => {
            dispatch(resetScores());
            fetch('/api/scoreboard/reopen').then((response) => { window.console.log(response); });
          }}
        >
          REPLAY
        </Button>
        {' '}
      </Link>
      <Link to="/admin">
        <Button
          variant="danger"
          onClick={() => {
            fetch('/api/scoreboard/close').then((response) => { window.console.log(response); });
          }}
        >
          HOME
        </Button>
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
