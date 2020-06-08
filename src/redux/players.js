const SET_PLAYERS = 'SET_PLAYERS';
const SET_TEAMS = 'SET_TEAMS';
const SET_SCORE = 'SET_SCORE';
const SET_SELECTED = 'SET_SELECTED';
const RESET_SELECTED = 'RESET_SELECTED';

const initialState = {
  /* list of players in the following format
   * { id: number, name: string } */
  playerlist: [],
  /* list of teams in the following format
   * { id: number, members: arrayOf(player) } */
  teamList: [],
  /* list of scores in the following format
   * { id: number, prevScore: number, score: number } */
  scoreList: [
    {
      id: 0, prevScore: 0, score: 0,
    },
    {
      id: 1, prevScore: 0, score: 0,
    },
    {
      id: 2, prevScore: 0, score: 0,
    },
    {
      id: 3, prevScore: 0, score: 0,
    },
    {
      id: 4, prevScore: 0, score: 0,
    },
    {
      id: 5, prevScore: 0, score: 0,
    },
    {
      id: 6, prevScore: 0, score: 0,
    },
    {
      id: 7, prevScore: 0, score: 0,
    },
    {
      id: 8, prevScore: 0, score: 0,
    },
    {
      id: 9, prevScore: 0, score: 0,
    },
  ],
  /* list of selected in the following format
   * { id: number, selected: bool } */
  selectedList: [
    {
      id: 0, selected: false,
    },
    {
      id: 1, selected: false,
    },
    {
      id: 2, selected: false,
    },
    {
      id: 3, selected: false,
    },
    {
      id: 4, selected: false,
    },
    {
      id: 5, selected: false,
    },
    {
      id: 6, selected: false,
    },
    {
      id: 7, selected: false,
    },
    {
      id: 8, selected: false,
    },
    {
      id: 9, selected: false,
    },
  ],
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
    case SET_PLAYERS:
      return {
        ...state,
        playerlist: action.payload,
      };
    case SET_TEAMS:
      return {
        ...state,
        teamList: action.payload,
      };
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
