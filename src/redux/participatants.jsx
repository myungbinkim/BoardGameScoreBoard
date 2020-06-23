const SELECT_PART = 'SELECT_PART';
const SET_PARTICIPATANTS = 'SET_PARTICIPATANTS';
const SET_PART_INFO = 'SET_PART_INFO';

export const selectPart = (id) => ({
  type: SELECT_PART,
  id,
});

export const setPart = () => ({
  type: SET_PARTICIPATANTS,
});

export const setPartInfo = (partinfo) => ({
  type: SET_PART_INFO,
  partinfo,
});

const initialState = {
  partInfo: [
    /*
    {
      id: 0,
      name: '명빈',
      selected: true,
    },
    {
      id: 1,
      name: ' 숭',
      selected: true,
    },
    {
      id: 2,
      name: '주현',
      selected: true,
    },
    {
      id: 3,
      name: '성우',
      selected: true,
    },
    {
      id: 4,
      name: '종찬',
      selected: true,
    },
    {
      id: 5,
      name: '희정',
      selected: true,
    },
    {
      id: 6,
      name: '주호',
      selected: true,
    },
    {
      id: 7,
      name: '태윤',
      selected: true,
    },
    {
      id: 8,
      name: '우진',
      selected: true,
    },
    {
      id: 9,
      name: '상현',
      selected: true,
    },
    */
  ],
  players: [],
};

function ParticipatantInfo(state = initialState, action) {
  switch (action.type) {
    case SELECT_PART:
      return {
        ...state,
        partInfo: state.partInfo.map((part) => (
          part.id === action.id ? { ...part, selected: !part.selected } : part)),
      };
    case SET_PARTICIPATANTS:
      return {
        ...state,
        players: state.partInfo.filter((part) => part.selected === true).map((part) => (
          { id: part.id, name: part.name })),
      };
    case SET_PART_INFO:
      return {
        ...state,
        partInfo: action.partinfo,
      };
    default:
      return state;
  }
}

export default ParticipatantInfo;
