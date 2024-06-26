import * as actionTypes from "../../actions/actionTypes";

const initialState = {
  creating: false,
  submitError: "",
  created: false
};

const playlistCreationStart = (state, action) => {
  return {
    ...state,
    creating: true,
  };
};

const playlistCreationFail = (state, action) => {
    return {
      ...state,
      submitError: "failed to create playlist",
    };
  };

const playlistCreationSuccess = (state, action) => {
  return {
    ...state,
    created: true,
  };
};

const createPlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYLIST_CREATION_START:
      return playlistCreationStart(state, action);
    case actionTypes.PLAYLIST_CREATION_FAIL:
      return playlistCreationFail(state, action);  
    case actionTypes.PLAYLIST_CREATION_SUCCESS:
      return playlistCreationSuccess(state, action);
    default:
      return state;
  }
};

export default createPlaylistReducer;
