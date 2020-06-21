const getTeamList = (teams) => (
  teams.map((team) => (team.members.map((member) => member.name)))
);

const getScoreList = (players) => (
  players.map((player) => ({ name: player.name, score: player.score }))
);

const getTimeStamp = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');

  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  window.console.log(timestamp);

  return timestamp;
};

const request = (data, date) => {
  fetch(`/api/scores?date=${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then((response) => { window.console.log(response); });
};

const postResult = (teams, players) => {
  const teamList = getTeamList(teams);
  const scoreList = getScoreList(players);
  request({ 'team-list': teamList, 'score-list': scoreList }, getTimeStamp());
};

export default postResult;
