export const SET_MAX_SCORE = 'SET_MAX_SCORE';
export const SET_TEAM_SIZE = 'SET_TEAM_SIZE';
export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_TEAM = 'SET_TEAM';
export const SET_SCORE = 'SET_SCORE';

export const setMaxScore = (score) => ({
  type: SET_MAX_SCORE,
  payload: { score },
});

export const setPlayersPerTeam = (count) => ({
  type: SET_TEAM_SIZE,
  payload: { count },
});

export const addPlayer = (name) => ({
  type: ADD_PLAYER,
  payload: { name },
});

export const setTeam = (name, team) => ({
  type: SET_TEAM,
  payload: { name, team },
});

export const setScore = (name, score) => ({
  type: SET_SCORE,
  payload: { name, score },
});
