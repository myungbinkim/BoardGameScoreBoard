/* react */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* bootstraps */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

/* redux */
import { setSelected, resetSelected, setScore } from '../redux/scores';

/* for dropdown */
import './ScoreBoard.css';

const renderPlayerButton = (player) => {
  const dispatch = useDispatch();
  const variant = player.scoreInfo.selected ? 'success' : 'secondary';
  const handleSelect = (eventKey) => {
    const value = parseInt(eventKey, 10);
    dispatch(setScore(player.playerInfo.id, value));
    if (!player.scoreInfo.selected) {
      dispatch(setSelected(player.playerInfo.id));
    }
  };
  const scoreArray = Array.from(new Array(100), (x, i) => i + 1);

  return (
    <DropdownButton
      id="dropdown-menu"
      variant={variant}
      key={player.playerInfo.name}
      title={player.playerInfo.name}
      onSelect={(eventKey) => handleSelect(eventKey)}
    >
      {scoreArray.map((i) => (<Dropdown.Item as="button" eventKey={i} key={i}>{i}</Dropdown.Item>))}
    </DropdownButton>
  );
};

const ScoreBar = (props) => {
  const { totalScore } = props;
  const maxScore = useSelector((state) => state.game.maxScore);
  const percentage = parseInt((totalScore / maxScore) * 100, 10);
  const now = percentage <= 100 ? percentage : 100;
  let progress = '';

  if (percentage >= 0 && percentage <= 50) {
    progress = 'success';
  } else if (percentage > 50 && percentage <= 75) {
    progress = 'warning';
  } else if (percentage > 75 && percentage <= 99) {
    progress = 'danger';
  } else {
    progress = 'dark';
  }
  return (
    <ProgressBar animated variant={progress} now={now} label={`${totalScore}`} block="true" />
  );
};

ScoreBar.propTypes = {
  totalScore: PropTypes.number.isRequired,
};

const renderTeam = (team) => {
  const { id, players, totalScore } = team;

  return (
    <Container className="border" key={id} fluid>
      <Row style={{ height: 50 }}>
        {players.map((player) => renderPlayerButton(player))}
      </Row>
      <ScoreBar totalScore={totalScore} />
    </Container>
  );
};

const Header = (props) => {
  const maxScore = useSelector((state) => state.game.maxScore);
  const { round } = props;
  return (
    <Container>
      <Row>
        <Col className="text-left">
          <Badge variant="secondary">
            {'Round '}
            {round}
          </Badge>
        </Col>
        <Col className="text-right">
          <Badge variant="secondary">
            {'Max Score: '}
            {maxScore}
          </Badge>
        </Col>
      </Row>
    </Container>
  );
};
Header.propTypes = {
  round: PropTypes.number.isRequired,
};

const TeamGrid = () => {
  /* redux */
  const playerList = useSelector((state) => state.players.playerList);
  const playerCount = useSelector((state) => state.players.playerCount);
  const playersPerTeam = useSelector((state) => state.game.playersPerTeam);
  const scoreArray = useSelector((state) => state.scores.scoreArray);

  /* for team */
  const teamCount = playerCount / playersPerTeam;
  const teamArray = new Array(teamCount);
  for (let i = 0; i < teamCount; i += 1) {
    teamArray[i] = { id: i, players: [], totalScore: 0 };
  }
  playerList.forEach((player) => {
    scoreArray.forEach((entry) => {
      const teamId = parseInt(player.team, 10);
      if (entry.id === player.id) {
        teamArray[teamId].players.push({ playerInfo: player, scoreInfo: entry });
        teamArray[teamId].totalScore += entry.score;
      }
    });
  });

  return (
    <Container key="team-grid">
      {teamArray.map((team) => renderTeam(team))}
    </Container>
  );
};

const NextRoundButton = (props) => {
  const { round, setRound } = props;
  const dispatch = useDispatch();
  const nextRound = round + 1;
  const disable = !useSelector((state) => state.scores.allPlayersSelected);

  return (
    <Button
      variant="info"
      size="lg"
      onClick={() => {
        dispatch(resetSelected());
        setRound(nextRound);
      }}
      disabled={disable}
      block
    >
      Next Round
    </Button>
  );
};

NextRoundButton.propTypes = {
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
};

const ScoreBoard = () => {
  /* state and ref */
  const [round, setRound] = useState(1);

  return (
    <Container>
      <Header round={round} />
      <TeamGrid />
      <NextRoundButton
        round={round}
        setRound={setRound}
      />
    </Container>
  );
};

export default ScoreBoard;
