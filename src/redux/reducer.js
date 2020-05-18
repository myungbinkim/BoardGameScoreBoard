import {
  SET_MAX_SCORE, SET_TEAM_SIZE, ADD_PLAYER, SET_TEAM, SET_SCORE,
} from './actions';

// 일단 scoreboard 테스트 하려고 다 넣어놓음
const initialState = {
  playerCount: 10,
  playersPerTeam: 2,
  maxScore: 77,
  playerList: [
    { name: '장성우', team: 0, score: 0 },
    { name: '박상현', team: 0, score: 0 },
    { name: '김명빈', team: 1, score: 0 },
    { name: '남주현', team: 1, score: 0 },
    { name: '안종찬', team: 2, score: 0 },
    { name: '양희정', team: 2, score: 0 },
    { name: '김태윤', team: 3, score: 0 },
    { name: '이주호', team: 3, score: 0 },
    { name: '김우진', team: 4, score: 0 },
    { name: '김숭', team: 4, score: 0 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_SCORE: {
      const { maxScore } = action.payload;
      return {
        ...state,
        maxScore,
      };
    }
    case SET_TEAM_SIZE: {
      const { playersPerTeam } = action.payload;
      return {
        ...state,
        playersPerTeam,
      };
    }
    case ADD_PLAYER: {
      const { name } = action.payload;
      const playerCount = state.playerCount + 1;
      const playerList = state.playerList.concat([{ name, team: 'undecided', score: 0 }]);

      return {
        ...state,
        playerCount,
        playerList,
      };
    }
    case SET_TEAM: {
      const { name, team } = action.payload;
      const playerList = state.playerList.map((player) => {
        if (player.name === name) {
          return { ...player, team };
        }
        return player;
      });

      return {
        ...state,
        playerList,
      };
    }
    case SET_SCORE: {
      const { name, score } = action.payload;
      const playerList = state.playerList.map((player) => {
        if (player.name === name) {
          const newScore = player.score + score;
          return { ...player, score: newScore };
        }
        return player;
      });

      return {
        ...state,
        playerList,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
