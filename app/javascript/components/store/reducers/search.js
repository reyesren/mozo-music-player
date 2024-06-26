import * as actionTypes from "../actions/actionTypes";

const initialState = {
  openSearch: false,
};

const setOpenSearch = (state, action) => {
  return {
    ...state,
    openSearch: action.payload.openSearch,
  };
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_SEARCH:
      return setOpenSearch(state, action);
    default:
      return state;
  }
};

export default searchReducer;