import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import ExpandableTable from './ExpandableTable';

const useRank = () => {
  const [form, setForm] = useState('TOP');
  let getRank = () => { };

  if (form === 'TOP') {
    getRank = () => {
      const players = ['heejung', 'myungbin', 'jongchan', 'juhyun', 'woojin', 'jooho', 'sanghyun', 'sungwoo', 'soong', 'taeyun'];
      return players.reduce(
        (rows, key) => (rows.push({ player: key, score: 100 })) && rows, [],
      );
    };
  } else {
    getRank = () => {
      const players = ['heejung', 'myungbin', 'jongchan', 'juhyun', 'woojin', 'jooho', 'sanghyun', 'sungwoo', 'soong', 'taeyun'];
      return players.reduce(
        (rows, key) => (rows.push({ player: key, score: 10 })) && rows, [],
      );
    };
  }

  return [getRank(), form, setForm];
};

const Rank = () => {
  const [rank, form, setRank] = useRank();
  return (
    <div>
      <ButtonGroup className="my-3 w-100">
        <Button variant="outline-dark" className="w-100" onClick={() => setRank('TOP')}>Top Score</Button>
        <Button variant="outline-dark" className="w-100" onClick={() => setRank('AVG')}>Avg Score</Button>
      </ButtonGroup>
      <ExpandableTable key={form} header={['#', 'PLAYER', 'SCORE']} rows={rank} />
    </div>
  );
};

export default Rank;
