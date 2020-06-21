const SET_MAX_SCORE = 'SET_MAX_SCORE';
const SET_TEAM_SIZE = 'SET_TEAM_SIZE';

const initialState = {
  playersPerTeam: 0,
  maxScore: 0,
};

export const setMaxScore = (score) => ({
  type: SET_MAX_SCORE,
  payload: score,
});

export const setPlayersPerTeam = (count) => ({
  type: SET_TEAM_SIZE,
  payload: count,
});

const game = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_SCORE: {
      const maxScore = action.payload;
      return {
        ...state,
        maxScore,
      };
    }
    case SET_TEAM_SIZE: {
      const playersPerTeam = action.payload;
      return {
        ...state,
        playersPerTeam,
      };
    }
    default:
      break;
  }
  return state;
};

export default game;
