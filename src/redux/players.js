const SET_PLAYERS = 'SET_PLAYERS';
const initialState = {
  playerCount: 10,
  playerList: [
    {
      id: 0, name: '장성우', team: 0,
    },
    {
      id: 1, name: '박상현', team: 0,
    },
    {
      id: 2, name: '김명빈', team: 1,
    },
    {
      id: 3, name: '남주현', team: 1,
    },
    {
      id: 4, name: '안종찬', team: 2,
    },
    {
      id: 5, name: '양희정', team: 2,
    },
    {
      id: 6, name: '김태윤', team: 3,
    },
    {
      id: 7, name: '이주호', team: 3,
    },
    {
      id: 8, name: '김우진', team: 4,
    },
    {
      id: 9, name: '김숭', team: 4,
    },
  ],
};

export const setPlayers = (playerList, playerCount) => ({
  type: SET_PLAYERS,
  payload: { playerList, playerCount },
});

const players = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYERS: {
      const { playerList, playerCount } = action.payload;
      return {
        ...state,
        playerCount,
        playerList,
      };
    }
    default:
      break;
  }
  return state;
};

export default players;
