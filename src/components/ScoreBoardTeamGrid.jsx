/* react */
import React from 'react';
import PropTypes from 'prop-types';

/* react-bootstrap */
import Container from 'react-bootstrap/Container';

/* components */
import Team from './ScoreBoardTeam';

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

export default TeamGrid;
