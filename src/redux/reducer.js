import {
  SET_MAX_SCORE, SET_TEAM_SIZE, ADD_PLAYER, SET_TEAM, SET_SCORE, SET_SELECTED, RESET_SELECTED
} from './actions';

// 일단 scoreboard 테스트 하려고 다 넣어놓음
const initialState = {
  playerCount: 10,
  playersPerTeam: 2,
  maxScore: 77,
  allPlayersSelected: false,
  playerList: [
    {
      name: '장성우', team: 0, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '박상현', team: 0, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '김명빈', team: 1, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '남주현', team: 1, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '안종찬', team: 2, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '양희정', team: 2, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '김태윤', team: 3, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '이주호', team: 3, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '김우진', team: 4, prevScore: 0, score: 0, selected: false,
    },
    {
      name: '김숭', team: 4, prevScore: 0, score: 0, selected: false,
    },
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
          const newScore = player.prevScore + score;
          return { ...player, score: newScore };
        }
        return player;
      });

      return {
        ...state,
        playerList,
      };
    }
    case SET_SELECTED: {
      const { name } = action.payload;
      const playerList = state.playerList.map((player) => {
        if (player.name === name) {
          return { ...player, selected: true };
        }
        return player;
      });
      let allPlayersSelected = true;
      playerList.forEach((player) => {
        allPlayersSelected = allPlayersSelected && player.selected;
      });
      return {
        ...state,
        allPlayersSelected,
        playerList,
      };
    }
    case RESET_SELECTED: {
      if (!state.allPlayersSelected) {
        window.console.log('Reset Selected was called when all players are not selected.');
      }
      const allPlayersSelected = false;
      const playerList = state.playerList.map((player) => (
        { ...player, selected: false, prevScore: player.score }));
      return {
        ...state,
        allPlayersSelected,
        playerList,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
