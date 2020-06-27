/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* components */
import PlayerButton from './ScoreBoardPlayerButton';
import ScoreBar from './ScoreBar';

const getTotalScore = (members, playerStates) => {
  let totalScore = 0;
  members.forEach((member) => {
    const score = playerStates.get(member.id).currentScore;
    totalScore += score;
  });
  return totalScore;
};

const Team = (props) => {
  const {
    team,
    playerStates,
    setPlayerStateAt,
    maxScore,
  } = props;
  const { id, members } = team;
  const teamKey = `team-${id}`;
  const totalScore = getTotalScore(members, playerStates);
  const buttonSize = maxScore > 77 ? '' : 'lg';

  return (
    <Container className="border mt-3 mb-3">
      <Row
        key={teamKey}
        className="mx-0 mb-3 mt-3"
      >
        {members.map((member) => (
          <Col
            key={`${teamKey}-${member.id}`}
            className="px-1 mx-0"
          >
            <PlayerButton
              player={member}
              size={buttonSize}
              playerStates={playerStates}
              setPlayerStateAt={setPlayerStateAt}
            />
          </Col>
        ))}
      </Row>
      <ScoreBar totalScore={totalScore} maxScore={maxScore} />
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
  }).isRequired,
  playerStates: PropTypes.instanceOf(Map).isRequired,
  setPlayerStateAt: PropTypes.func.isRequired,
  maxScore: PropTypes.number.isRequired,
};

export default Team;
