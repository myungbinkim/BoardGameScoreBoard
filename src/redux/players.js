const SET_PLAYERS = 'SET_PLAYERS';
const SET_TEAMS = 'SET_TEAMS';
const SET_SCORE = 'SET_SCORE';
const SET_SELECTED = 'SET_SELECTED';
const RESET_SELECTED = 'RESET_SELECTED';

const initialState = {
  /* list of players in the following format
   * { id: number, name: string } */
  playerList: [],
  playersPerTeam: 2,
  /* list of teams in the following format
   * { id: number, members: arrayOf({ id: number, name: string }) } */
  teamList: [],
  /* list of scores in the following format
   * { id: number, prevScore: number, score: number } */
  scoreList: [],
  /* list of selected in the following format
   * { id: number, selected: bool } */
  selectedList: [],
  allPlayersSelected: false,
};

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const setTeams = (teams) => ({
  type: SET_TEAMS,
  payload: teams,
});

export const setScore = (id, score) => ({
  type: SET_SCORE,
  payload: { id, score },
});

export const setSelected = (id) => ({
  type: SET_SELECTED,
  payload: { id },
});

export const resetSelected = () => ({
  type: RESET_SELECTED,
  payload: {},
});

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS: {
      const playerList = action.payload;
      const scoreList = playerList.map((player) => ({ ...player, prevScore: 0, score: 0 }));
      const selectedList = playerList.map((player) => ({ ...player, selected: false }));
      return {
        ...state,
        playerList,
        scoreList,
        selectedList,
      };
    }
    case SET_TEAMS: {
      const teamList = action.payload;
      return {
        ...state,
        teamList,
      };
    }
    case SET_SCORE: {
      const { id, score } = action.payload;
      const scoreList = state.scoreList.map((entry) => {
        if (entry.id === id) {
          const newScore = entry.prevScore + score;
          return { ...entry, score: newScore };
        }
        return entry;
      });

      return {
        ...state,
        scoreList,
      };
    }
    case SET_SELECTED: {
      const { id } = action.payload;
      const selectedList = state.selectedList.map((entry) => {
        if (entry.id === id) {
          return { ...entry, selected: true };
        }
        return entry;
      });
      let allPlayersSelected = true;
      selectedList.forEach((entry) => {
        allPlayersSelected = allPlayersSelected && entry.selected;
      });
      return {
        ...state,
        allPlayersSelected,
        selectedList,
      };
    }
    case RESET_SELECTED: {
      if (!state.allPlayersSelected) {
        window.console.log('Reset Selected was called when all players are not selected.');
      }
      const scoreList = state.scoreList.map((entry) => (
        { ...entry, prevScore: entry.score }));
      const selectedList = state.selectedList.map((entry) => (
        { ...entry, selected: false }));
      const allPlayersSelected = false;
      return {
        ...state,
        scoreList,
        selectedList,
        allPlayersSelected,
      };
    }
    default:
      return { ...state };
  }
};

export default players;
