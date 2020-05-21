import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

const ArrayShuffle = (arr) => {
  let j;
  let x;
  let i;
  for (i = arr.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = arr[i - 1];
    arr[i - 1] = arr[j];
    arr[j] = x;
  }
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
  const sortoptions = {
    defaultSortName: 'rank',
    defaultSortOrder: 'asc',
  };

  return (
    <div>
      <BootstrapTable data={data} options={sortoptions} striped>
        <TableHeaderColumn dataField="rank" isKey dataSort dataAlign="center" width="50">예상 순위</TableHeaderColumn>
        <TableHeaderColumn dataField="member" dataAlign="center" width="150">팀원</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

TeamTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    rank: PropTypes.number.isRequired,
    member: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default function TeamMatching() {
  // players는 인자로 받아야 함
  const players = ['희정', '명빈', '종찬', '주현', '우진', '주호', '상현', '성우', '숭', '태윤'];
  ArrayShuffle(players);
  const NumberOfMembers = FindNumberOfMembers(players.length);
  const Team = [];
  for (let i = 0; i < players.length; i += NumberOfMembers) {
    Team.push({
      rank: 1,
      member: players.slice(i, i + NumberOfMembers),
      score: 77 + i,
    });
  }
  Team.sort((a, b) => a.score - b.score);
  Team.forEach((element, index) => { element.rank = index; });

  return (
    <TeamTable data={Team} />
  );
}
