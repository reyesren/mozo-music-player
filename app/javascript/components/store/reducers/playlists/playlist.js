import * as actionTypes from "../../actions/actionTypes";

const initialState = {
  fail: false,
  success: false,
  playlists: [],
  favourites: [],
  current: {
    _id: {
      $oid: "",
    },
    access: "",
    created_at: "",
    description: "",
    favourited_by: [],
    name: "",
    num_views: 0,
    songs: [],
    updated_at: "",
    user: "",
  },
  deletion: "",
  update: "",
  errors: "",
};

const getPlaylistsSuccess = (state, action) => {
  return {
    ...state,
    success: true,
  };
};

const getPlaylistsFail = (state, action) => {
  return {
    ...state,
  fail: true,
  error: action.payload.error
  };
};

const getPlaylistsList = (state, action) => {
  return {
    ...state,
    playlists: action.payload.playlists,
  };
};

const getFavouritesSuccess = (state, action) => {
  return {
    ...state,
    success: true,
  };
};

const getFavouritesFail = (state, action) => {
  return {
    ...state,
  fail: true,
  error: action.payload.error
  };
};

const getFavouritesList = (state, action) => {
  return {
    ...state,
    favourites: action.payload.favourites,
  };
};


const getCurrent = (state, action) => {
  return {
    ...state,
    current: action.payload.playlist,
  }
}

const deletePlaylistSuccess = (state, action) => {
  return {
    ...state,
    deletion: action.payload.feedback,
  }
}

const deletePlaylistFail = (state, action) => {
  return {
    ...state,
    fail: true,
    error: action.payload.error
  };
};

const updatePlaylistSuccess = (state, action) => {
  return {
    ...state,
    update: action.payload.feedback,
  }
}

const updatePlaylistFail = (state, action) => {
  return {
    ...state,
    fail: true,
    error: action.payload.error
  };
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS_SUCCESS:
      return getPlaylistsSuccess(state, action);
    case actionTypes.GET_PLAYLISTS_FAIL:
      return getPlaylistsFail(state, action);
    case actionTypes.GET_PLAYLISTS:
      return getPlaylistsList(state, action);
    case actionTypes.GET_FAVOURITES_SUCCESS:
      return getFavouritesSuccess(state, action);
    case actionTypes.GET_FAVOURITES_FAIL:
      return getFavouritesFail(state, action);
    case actionTypes.GET_FAVOURITES:
      return getFavouritesList(state, action);
    case actionTypes.GET_CURRENT_PLAYLIST:
      return getCurrent(state, action);
    case actionTypes.DELETE_PLAYLIST_SUCCESS:
      return deletePlaylistSuccess(state, action);
    case actionTypes.DELETE_PLAYLIST_FAIL:
      return deletePlaylistFail(state, action);
    case actionTypes.UPDATE_PLAYLIST_SUCCESS:
      return updatePlaylistSuccess(state, action);
    case actionTypes.UPDATE_PLAYLIST_FAIL:
      return updatePlaylistFail(state, action);
    default:
      return state;
  };
};

export default playlistReducer;
