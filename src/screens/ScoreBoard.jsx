/* react */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
import { setSelected, resetSelected, setScore } from '../redux/players';

const isPlayerSelected = (id, selectedList) => (
  selectedList.find((x) => (x.id === id)).selected
);

const renderPlayerButton = (player, selectedList) => {
  const dispatch = useDispatch();
  const selected = isPlayerSelected(player.id, selectedList);
  const variant = selected ? 'success' : 'secondary';

  const handleSelect = (eventKey) => {
    const value = Number(eventKey);
    dispatch(setScore(player.id, value));
    if (!selected) {
      dispatch(setSelected(player.id));
    }
  };
  const scoreArray = Array.from(new Array(100), (x, i) => i + 1);

  return (
    <DropdownButton
      style={{
        height: '200px',
        maxHeight: '200px',
        overflowY: 'scroll',
      }}
      variant={variant}
      key={player.name}
      title={player.name}
      onSelect={(eventKey) => handleSelect(eventKey)}
    >
      {scoreArray.map((i) => (
        <Dropdown.Item as="button" eventKey={i} key={`${player.name}-${i}`}>
          {i}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

const ScoreBar = (props) => {
  const { totalScore, maxScore } = props;
  const percentage = Number((totalScore / maxScore) * 100);
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
  maxScore: PropTypes.number.isRequired,
};

const Team = (props) => {
  const {
    team,
    maxScore,
    selectedList,
  } = props;
  const { id, members, score } = team;
  const key = `team-${id}`;

  return (
    <Container className="border" fluid>
      <Row style={{ height: 50 }} key={key}>
        {members.map((member) => renderPlayerButton(member, selectedList))}
      </Row>
      <ScoreBar totalScore={score} maxScore={maxScore} />
    </Container>
  );
};
Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  maxScore: PropTypes.number.isRequired,
  selectedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
};

const Header = (props) => {
  const { round, maxScore } = props;
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
  maxScore: PropTypes.number.isRequired,
};

const TeamGrid = (props) => {
  const { maxScore, teamInfos, selectedList } = props;
  const renderTeam = (team) => (
    <Team
      key={team.id}
      team={team}
      maxScore={maxScore}
      selectedList={selectedList}
    />
  );
  return (
    <Container key="team-grid">
      {teamInfos.map((team) => renderTeam(team))}
    </Container>
  );
};
TeamGrid.propTypes = {
  maxScore: PropTypes.number.isRequired,
  teamInfos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
  selectedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
};

const NextRoundButton = (props) => {
  const { round, setRound, allSelected } = props;
  const dispatch = useDispatch();
  const nextRound = round + 1;

  return (
    <Button
      variant="info"
      size="lg"
      onClick={() => {
        dispatch(resetSelected());
        setRound(nextRound);
      }}
      disabled={!allSelected}
      block
    >
      Next Round
    </Button>
  );
};
NextRoundButton.propTypes = {
  round: PropTypes.number.isRequired,
  setRound: PropTypes.func.isRequired,
  allSelected: PropTypes.bool.isRequired,
};

const GameOverButton = () => (
  <Link to="/game-over">
    <Button variant="danger" size="lg" block> Game Over </Button>
  </Link>
);

const IsGameOver = (maxScore, teamInfos) => {
  let isOver = false;
  teamInfos.forEach((team) => { isOver = isOver || (team.score > maxScore); });
  return isOver;
};

const getTeamInfos = (teams, scores) => (
  teams.map((team) => {
    let totalScore = 0;
    const { members } = team;
    members.forEach((member) => {
      scores.forEach((entry) => {
        if (entry.id === member.id) {
          totalScore += entry.score;
        }
      });
    });
    return { ...team, score: totalScore };
  })
);

const ScoreBoard = () => {
  /* state */
  const [round, setRound] = useState(1);

  /* redux */
  const maxScore = useSelector((state) => state.game.maxScore);
  const teams = useSelector((state) => state.players.teamList);
  const scores = useSelector((state) => state.players.scoreList);
  const selectedList = useSelector((state) => state.players.selectedList);
  const allSelected = useSelector((state) => state.players.allPlayersSelected);

  const teamInfos = getTeamInfos(teams, scores);
  const isOver = IsGameOver(maxScore, teamInfos);

  return (
    <Container>
      <Header round={round} maxScore={maxScore} />
      <TeamGrid maxScore={maxScore} teamInfos={teamInfos} selectedList={selectedList} />
      {isOver && allSelected ? <GameOverButton />
        : <NextRoundButton round={round} setRound={setRound} allSelected={allSelected} />}
    </Container>
  );
};

export default ScoreBoard;
