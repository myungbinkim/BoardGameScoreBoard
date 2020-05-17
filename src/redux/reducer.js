import { SET_MAX_SCORE, SET_TEAM_SIZE, ADD_PLAYER, SET_TEAM, SET_SCORE } from "./actions"

// 일단 scoreboard 테스트 하려고 다 넣어놓음
const initialState = {
  playerCount: 10,
  playersPerTeam: 2,
  maxScore: 77,
  playerList: [    
    {name: "장성우", team: 0, score: 0 },
    {name: "박상현", team: 0, score: 0 },
    {name: "김명빈", team: 1, score: 0 },
    {name: "남주현", team: 1, score: 0 },
    {name: "안종찬", team: 2, score: 0 },
    {name: "양희정", team: 2, score: 0 },
    {name: "김태윤", team: 3, score: 0 },
    {name: "이주호", team: 3, score: 0 },
    {name: "김우진", team: 4, score: 0 },
    {name: "김숭", team: 4, score: 0 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_SCORE: {
      const {maxScore} = action.payload;
      return {
        ...state,
        maxScore: maxScore,
      };
    }
    case SET_TEAM_SIZE: {
      const {playersPerTeam} = action.payload;
      return {
        ...state,
        playersPerTeam: playersPerTeam,
      };
    }
    case ADD_PLAYER: {
      const {name} = action.payload;
      const newPlayerCount = state.playerCount + 1;
      const newPlayerList = state.playerList.concat([{name: name, team: undecided, score: 0}]);
      
      return {
        ...state,
        playerCount: newPlayerCount,
        playerList: newPlayerList,
      };
    }
    case SET_TEAM: {
      const {name, team} = action.payload;
      const newPlayerList = state.playerList.map((player) => {
        let ret = player;
        if (player.name === name) {
          ret.team = team;
        }
        return ret;
      });

      return {
        ...state,
        playerList: newPlayerList,
      };
    }
    case SET_SCORE: {
      const {name, score} = action.payload;
      const newPlayerList = state.playerList.map((player) => {
        let ret = player;
        if (player.name === name) {
          ret.score += score;
        }
        return ret;
      });

      return {
        ...state,
        playerList: newPlayerList,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
