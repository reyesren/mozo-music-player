import * as actionTypes from "./actionTypes";

export const setOpenSearch = (toOpen) => {
  return {
    type: actionTypes.OPEN_SEARCH,
    payload: {
      openSearch: toOpen,
    },
  };
};