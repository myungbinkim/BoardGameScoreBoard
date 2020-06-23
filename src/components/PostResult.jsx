const getTeamIdOf = (teams, player) => {
  const found = teams.find((team) => (
    team.members.some((member) => member.id === player.id)
  ));
  return found.id;
};

const getResultData = (teams, players) => (
  players.map((player) => {
    const teamId = getTeamIdOf(teams, player);
    return { id: player.id, team: teamId, score: player.score };
  })
);

const request = (data) => {
  fetch('/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((response) => { window.console.log(response); });
};

const postResult = (teams, players) => {
  const data = getResultData(teams, players);
  request({ result: data });
};

export default postResult;
