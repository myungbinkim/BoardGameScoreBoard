import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';

const useRank = () => {
  const players = ['heejung', 'myungbin', 'jongchan', 'juhyun', 'woojin', 'jooho', 'sanghyun', 'sungwoo', 'soong', 'taeyun'];
  const [form, setForm] = useState(1);
  const toMatrix = (arr, width) => arr.reduce(
    (rows, key, index) => (index % width === 0 ? rows.push({ team: [key], score: 100 })
      : rows[rows.length - 1].team.push(key)) && rows, [],
  );

  const rank = toMatrix(players, form);

  return [rank, setForm];
};

const Rank = () => {
  const [rank, setRank] = useRank();
  return (
    <div>
      <ButtonGroup className="my-3 w-100">
        <Button variant="outline-dark" className="w-100" onClick={() => setRank(1)}>Top Score</Button>
        <Button variant="outline-dark" className="w-100" onClick={() => setRank(2)}>Avg Score</Button>
      </ButtonGroup>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>PLAYER</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {rank.map((row, index) => (
            <tr key={row.team}>
              <td>{index + 1}</td>
              <td>{row.team.join(', ')}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Rank;
