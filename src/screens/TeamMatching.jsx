import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from "prop-types";

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
  let i;
  for (i = 2; i <= arrsize; i += 1) {
    if (arrsize % i === 0) break;
  }
  return i;
};

function TeamTable(props) {
  const { data } = props;
  return (
    <div>
      <BootstrapTable data={data}>
        <TableHeaderColumn isKey dataField="id">
          No
        </TableHeaderColumn>
        <TableHeaderColumn dataField="member">
          Member
        </TableHeaderColumn>
        <TableHeaderColumn dataField="rank">
          expected rank
        </TableHeaderColumn>
        <TableHeaderColumn dataField="score">
          expected score
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

TeamTable.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

export default function TeamMatching() {
  // players는 인자로 받아야 함
  const players = ['heejung', 'myungbin', 'jongchan', 'juhyun', 'woojin', 'jooho', 'sanghyun', 'sungwoo', 'soong', 'taeyun'];
  ArrayShuffle(players);
  const numberofmembers = FindNumberOfMembers(players.length);
  const TeamCount = players.length / numberofmembers;
  const Team = new Array(TeamCount);
  for (let i = 0; i < TeamCount; i += 1) {
    Team[i] = {
      id: i, member: `${players[i * 2]} and ${players[i * 2 + 1]}`, rank: 1, score: 77,
    };
  }
  return (
    <TeamTable data={Team} />
  );
}