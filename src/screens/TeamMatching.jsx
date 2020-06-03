import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { setTeam } from '../redux/players';

const ArrayShuffle = (arr) => {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const FindNumberOfMembers = (arrsize) => {
  for (let num = 2; num < arrsize; num += 1) {
    if (arrsize % num === 0) return num;
  }
  return 1;
};

function TeamTable(props) {
  const { data } = props;
  const columns = [{
    dataField: 'id',
    text: '팀',
    headerAlign: 'center',
    align: 'center',
  }, {
    dataField: 'players',
    text: '팀원',
    headerAlign: 'center',
    align: 'center',
  }];
  const showData = data.map((elem) => {
    const obj = { id: elem.id + 1, players: '' };
    for (let i = 0; i < elem.members.length; i += 1) {
      obj.players = `${obj.players + elem.members[i].name} `;
    }
    return obj;
  });

  return (
    <BootstrapTable keyField="id" data={showData} columns={columns} headerAlign="center" bordered striped />
  );
}

TeamTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

export default function TeamMatching() {
  const players = useSelector((state) => state.players.playerlist);
  const NumberOfMembers = FindNumberOfMembers(players.length);
  const shuffle = ArrayShuffle(players);
  const dispatch = useDispatch();

  const Team = [];
  for (let i = 0, j = 0; j < shuffle.length; j += NumberOfMembers, i += 1) {
    Team[i] = {
      id: i,
      members: shuffle.slice(j, j + NumberOfMembers),
    };
  }

  useEffect(() => () => { dispatch(setTeam(Team)); });

  return (
    <div>
      <TeamTable data={Team} />
      <Link to="/score-board">
        <Button variant="success">GAME START</Button>
      </Link>
    </div>
  );
}
