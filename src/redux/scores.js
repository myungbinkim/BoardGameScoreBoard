const SET_SCORE = 'SET_SCORE';
const SET_SELECTED = 'SET_SELECTED';
const RESET_SELECTED = 'RESET_SELECTED';

const initialState = {
  allPlayersSelected: false,
  scoreArray: [
    {
      id: 0, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 1, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 2, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 3, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 4, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 5, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 6, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 7, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 8, prevScore: 0, score: 0, selected: false,
    },
    {
      id: 9, prevScore: 0, score: 0, selected: false,
    },
  ],
};

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

const scores = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCORE: {
      const { id, score } = action.payload;
      const scoreArray = state.scoreArray.map((entry) => {
        if (entry.id === id) {
          const newScore = entry.prevScore + score;
          return { ...entry, score: newScore };
        }
        return entry;
      });

      return {
        ...state,
        scoreArray,
      };
    }
    case SET_SELECTED: {
      const { id } = action.payload;
      const scoreArray = state.scoreArray.map((entry) => {
        if (entry.id === id) {
          return { ...entry, selected: true };
        }
        return entry;
      });
      let allPlayersSelected = true;
      scoreArray.forEach((entry) => {
        allPlayersSelected = allPlayersSelected && entry.selected;
      });
      return {
        ...state,
        allPlayersSelected,
        scoreArray,
      };
    }
    case RESET_SELECTED: {
      if (!state.allPlayersSelected) {
        window.console.log('Reset Selected was called when all players are not selected.');
      }
      const allPlayersSelected = false;
      const scoreArray = state.scoreArray.map((entry) => (
        { ...entry, selected: false, prevScore: entry.score }));
      return {
        ...state,
        allPlayersSelected,
        scoreArray,
      };
    }
    default:
      break;
  }
  return state;
};

export default scores;
