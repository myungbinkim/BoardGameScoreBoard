/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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

  return (
    <Container className="border" fluid>
      <Row
        key={teamKey}
        style={{
          height: '38px',
          marginRight: '0px',
          marginLeft: '0px',
          marginTop: '6px',
          marginBottom: '6px',
        }}
      >
        {members.map((member) => (
          <PlayerButton
            key={`${teamKey}-${member.name}`}
            player={member}
            playerStates={playerStates}
            setPlayerStateAt={setPlayerStateAt}
          />
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
