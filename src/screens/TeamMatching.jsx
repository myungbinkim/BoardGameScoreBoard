import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { setTeam } from '../redux/players';

const ArrayShuffle = (arr) => {
  const resultArr = arr.slice();
  let j;
  let x;
  let i;
  for (i = resultArr.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = resultArr[i - 1];
    resultArr[i - 1] = resultArr[j];
    resultArr[j] = x;
  }
  return resultArr;
};

const FindNumberOfMembers = (arrsize) => {
  let num;
  for (num = 2; num <= arrsize; num += 1) {
    if (arrsize % num === 0) break;
  }

  if (num === arrsize) num = 1;

  return num;
};

function TeamTable(props) {
  const { data } = props;

  return (
    <BootstrapTable data={data} striped>
      <TableHeaderColumn dataField="id" isKey dataSort dataAlign="center" width="50">팀</TableHeaderColumn>
      <TableHeaderColumn dataField="member" dataAlign="center" width="150">팀원</TableHeaderColumn>
    </BootstrapTable>
  );
}

TeamTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    member: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default function TeamMatching() {
  const players = useSelector((state) => state.players.playerlist);
  const NumberOfMembers = FindNumberOfMembers(players.length);
  const shuffle = ArrayShuffle(players);
  const dispatch = useDispatch();

  const Team = [];
  for (let i = 0, j = 1; i < shuffle.length; i += NumberOfMembers, j += 1) {
    Team.push({
      id: j,
      member: shuffle.slice(i, i + NumberOfMembers),
    });
  }

  useEffect(() => {
    return () => {
      dispatch(setTeam(Team));
    };
  });

  return (
    <div>
      <TeamTable data={Team} />
      <Link to="/score-board">
        <Button variant="success">GAME START</Button>
      </Link>
    </div>
  );
}
