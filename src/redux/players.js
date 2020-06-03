const SET_PLAYERS = 'SET_PLAYERS';
const SET_TEAM = 'SET_TEAM';

const initialState = {
  playerlist: [
    { id: 0, name: '희정' },
    { id: 1, name: '주현' },
    { id: 2, name: '종찬' },
    { id: 3, name: '상현' },
    { id: 4, name: '성우' },
    { id: 5, name: '명빈' },
    { id: 6, name: '태윤' },
    { id: 7, name: '우진' },
    { id: 8, name: '주호' },
    { id: 9, name: '숭' },
  ],
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
