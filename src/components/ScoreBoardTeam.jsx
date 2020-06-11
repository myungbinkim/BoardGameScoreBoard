/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/* components */
import PlayerButton from './ScoreBoardPlayerButton';
import ScoreBar from './ScoreBar';

const Team = (props) => {
  const {
    team,
    maxScore,
    selectedList,
  } = props;
  const { id, members, score } = team;
  const teamKey = `team-${id}`;

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
            selectedList={selectedList}
          />
        ))}
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

export default Team;
