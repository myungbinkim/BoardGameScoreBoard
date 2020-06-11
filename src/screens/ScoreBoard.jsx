/* react */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/* bootstraps */
import Container from 'react-bootstrap/Container';

/* components */
import Header from '../components/ScoreBoardHeader';
import GameOverButton from '../components/GameOverButton';
import NextRoundButton from '../components/NextRoundButton';
import TeamGrid from '../components/ScoreBoardTeamGrid';

const IsGameOver = (maxScore, teamInfos) => {
  let isOver = false;
  teamInfos.forEach((team) => { isOver = isOver || (team.score > maxScore); });
  return isOver;
};

const getTeamInfos = (teams, scores) => (
  teams.map((team) => {
    let totalScore = 0;
    const { members } = team;
    members.forEach((member) => {
      scores.forEach((entry) => {
        if (entry.id === member.id) {
          totalScore += entry.score;
        }
      });
    });
    return { ...team, score: totalScore };
  })
);

const ScoreBoard = () => {
  /* state */
  const [round, setRound] = useState(1);

  /* redux */
  const maxScore = useSelector((state) => state.game.maxScore);
  const teams = useSelector((state) => state.players.teamList);
  const scores = useSelector((state) => state.players.scoreList);
  const selectedList = useSelector((state) => state.players.selectedList);
  const allSelected = useSelector((state) => state.players.allPlayersSelected);

  const teamInfos = getTeamInfos(teams, scores);
  const isOver = IsGameOver(maxScore, teamInfos);

  return (
    <Container>
      <Header round={round} maxScore={maxScore} />
      <TeamGrid maxScore={maxScore} teamInfos={teamInfos} selectedList={selectedList} />
      {isOver && allSelected ? <GameOverButton />
        : <NextRoundButton round={round} setRound={setRound} allSelected={allSelected} />}
    </Container>
  );
};

export default ScoreBoard;
