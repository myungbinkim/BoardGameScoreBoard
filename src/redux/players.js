const SET_PLAYERS = 'SET_PLAYERS';
const SET_TEAMS = 'SET_TEAMS';
const SET_SCORES = 'SET_SCORES';
const RESET_SCORES = 'RESET_SCORES';

const initialState = {
  /* format: { id: number, name: string, score: number } */
  playerList: [],
  /* format: { id: number, members: arrayOf({ id: number, name: string }) } */
  teamList: [],
};

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const setTeams = (teams) => ({
  type: SET_TEAMS,
  payload: teams,
});

export const setScores = (scores) => ({
  type: SET_SCORES,
  payload: scores,
});

export const resetScores = () => ({
  type: RESET_SCORES,
});

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS: {
      const playerList = action.payload;
      return {
        ...state,
        playerList,
      };
    }
    case SET_TEAMS: {
      const teamList = action.payload;
      return {
        ...state,
        teamList,
      };
    }
    case SET_SCORES: {
      const scores = action.payload;
      const playerList = state.playerList.map((player) => {
        const finalScore = scores.find((entry) => entry.id === player.id).score;
        return {
          ...player,
          score: finalScore,
        };
      });
      return {
        ...state,
        playerList,
      };
    }
    case RESET_SCORES: {
      const playerList = state.playerList.map((player) => ({
        ...player,
        score: 0,
      }));
      return {
        ...state,
        playerList,
      };
    }
    default:
      return { ...state };
  }
};

export default players;
