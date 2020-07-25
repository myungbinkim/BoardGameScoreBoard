import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { setTeams } from '../redux/players';

const ArrayShuffle = (arr) => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const makeTeamList = (arr, playersPerTeam) => {
  const teamList = [];
  for (let i = 0, j = 0; j < arr.length; j += playersPerTeam, i += 1) {
    teamList[i] = {
      id: i,
      members: arr.slice(j, j + playersPerTeam),
    };
  }
  return teamList;
};

function TeamCard(props) {
  const { id, players } = props;
  const { onClick, front } = props;
  const className = 'mb-2 mr-2 text-center';
  return (
    <Card onClick={onClick} key={id} className={className} border="dark">
      <Card.Header as="h5">{`${id + 1} 팀`}</Card.Header>
      <ListGroup className="list-group-flush">
        {players.map((player) => (
          front ? <ListGroup.Item key={player.id}>?</ListGroup.Item>
            : <ListGroup.Item key={player.id}>{player.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

TeamCard.propTypes = {
  id: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  front: PropTypes.bool.isRequired,
};

function TeamView(props) {
  const { id, players } = props;
  const [isFlipped, setFlipped] = useState(false);
  const front = true;
  const onClick = () => { setFlipped(true); };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <TeamCard id={id} players={players} onClick={onClick} front={front} />
      <TeamCard id={id} players={players} onClick={onClick} front={!front} />
    </ReactCardFlip>
  );
}

TeamView.propTypes = {
  id: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default function TeamMatching() {
  const players = useSelector((state) => state.players.playerList);
  const playersPerTeam = useSelector((state) => state.game.playersPerTeam);
  let teamList = useSelector((state) => state.players.teamList);
  const maxScore = useSelector((state) => state.game.maxScore);
  const dispatch = useDispatch();

  teamList = makeTeamList(ArrayShuffle(players), playersPerTeam);

  const OpenUserScoreBoard = () => {
    console.log('open user ScoreBoard');
    fetch('/api/scoreboard/open', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ teamlist: teamList, maxscore: maxScore }),
    }).then((response) => { window.console.log(response); });
  };

  useEffect(() => () => {
    dispatch(setTeams(teamList));
  });

  return (
    <div>
      <Container>
        {teamList.map((team) => (
          <TeamView id={team.id} players={team.members} key={team.id} />
        ))}
      </Container>
      <Link to="/admin/score-board">
        <Button onClick={OpenUserScoreBoard} variant="success" size="lg" block>GAME START</Button>
      </Link>
    </div>
  );
}
