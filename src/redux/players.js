const SET_PLAYERS = 'SET_PLAYERS';
const SET_TEAM = 'SET_TEAM';

const initialState = {
  playerlist: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  team: [],
};

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players,
});

export const setTeam = (team) => ({
  type: SET_TEAM,
  payload: team,
});

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        playerlist: action.payload,
      };
    case SET_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    default:
      return { ...state };
  }
};

export default players;
