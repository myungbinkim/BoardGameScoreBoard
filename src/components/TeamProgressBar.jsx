import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TeamProgressBar = ({ maxscore, members }) => {
  const variants = ['primary', 'warning', 'danger'];
  const totalScore = members.reduce((acc, mem) => acc + mem.score, 0);
  let remainScore = maxscore - totalScore;
  const isOver = remainScore < 0;
  remainScore = isOver ? 0 : remainScore;

  return (
    <div className="mb-3">
      {
        members.map((mem, i) => (
          <Button className="mr-1" key={mem.id} variant={variants[i]}>{mem.name}</Button>
        ))
      }
      <ProgressBar className="my-2" style={{ height: 25 }}>
        {
          members.map((mem, i) => (
            <ProgressBar
              key={mem.id}
              max={maxscore}
              now={mem.score}
              label={mem.score}
              variant={isOver ? 'dark' : variants[i]}
              animated
              style={{ fontSize: 16 }}
            />
          ))
        }
        <ProgressBar
          max={maxscore}
          now={remainScore}
          label={-remainScore}
          variant="light"
          style={{ fontSize: 16 }}
        />
      </ProgressBar>
    </div>
  );
};

TeamProgressBar.propTypes = {
  maxscore: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default TeamProgressBar;
