import timeConstants from '../constants/timeConstants';

const initialState = {
  time: {},
  date: {},
  loading: false,
};

// eslint-disable-next-line default-param-last
export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case timeConstants.GET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case timeConstants.GET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
