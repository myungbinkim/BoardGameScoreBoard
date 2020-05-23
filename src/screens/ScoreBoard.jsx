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
import { setSelected, resetSelected, setScore } from '../redux/actions';

const renderPlayerButton = (player) => {
  const dispatch = useDispatch();
  const variant = player.selected ? 'success' : 'secondary';
  const handleSelect = (eventKey) => {
    const value = parseInt(eventKey, 10);
    dispatch(setScore(player.name, value));
    if (!player.selected) {
      dispatch(setSelected(player.name));
    }
  };

  return (
    <DropdownButton
      variant={variant}
      key={player.name}
      title={player.name}
      onSelect={(eventKey) => handleSelect(eventKey)}
    >
      <Dropdown.Item as="button" eventKey="10">10</Dropdown.Item>
      <Dropdown.Item as="button" eventKey="20">20</Dropdown.Item>
      <Dropdown.Item as="button" eventKey="30">30</Dropdown.Item>
      <Dropdown.Item as="button" eventKey="40">40</Dropdown.Item>
    </DropdownButton>
  );
};

const ScoreBar = (props) => {
  const { currentScore } = props;
  const maxScore = useSelector((state) => state.maxScore);
  const percentage = parseInt((currentScore / maxScore) * 100, 10);
  const now = percentage <= 100 ? percentage : 100;

  let progress = '';

  if (percentage >= 0 && percentage <= 50) {
    progress = 'success';
  } else if (percentage > 50 && percentage <= 75) {
    progress = 'warning';
  } else {
    progress = 'danger';
  }
  return (
    <ProgressBar animated variant={progress} now={now} label={`${currentScore}`} block="true" />
  );
};

ScoreBar.propTypes = {
  currentScore: PropTypes.number.isRequired,
};

const renderTeam = (team) => {
  let currentScore = 0;
  const { players } = team;
  players.forEach((player) => {
    currentScore += parseInt(player.score, 10);
  });
  return (
    <Container className="border" key={team.id} fluid>
      <Row style={{ height: 50 }}>
        {players.map((player) => renderPlayerButton(player))}
      </Row>
      <ScoreBar currentScore={currentScore} />
    </Container>
  );
};

const Header = (props) => {
  const maxScore = useSelector((state) => state.maxScore);
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
  const playerList = useSelector((state) => state.playerList);
  const playerCount = useSelector((state) => state.playerCount);
  const playersPerTeam = useSelector((state) => state.playersPerTeam);

  /* for team */
  const teamCount = playerCount / playersPerTeam;
  const teamArray = new Array(teamCount);
  for (let i = 0; i < teamCount; i += 1) {
    teamArray[i] = { id: i, players: [] };
  }
  playerList.forEach((player) => {
    teamArray[player.team].players.push(player);
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
  const disable = !useSelector((state) => state.allPlayersSelected);

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
