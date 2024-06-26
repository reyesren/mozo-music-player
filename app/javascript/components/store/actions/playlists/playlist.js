import axios from "axios";
import * as actionTypes from "../actionTypes";
import * as actions from "../index";

export const getPlaylistsSuccess = () => {
  return {
    type: actionTypes.GET_PLAYLISTS_SUCCESS,
  };
};

export const getPlaylistsFail = (error) => {
  return {
    type: actionTypes.GET_PLAYLISTS_FAIL,
    payload: {
      error: error
    }
  };
};

export const getPlaylistsLists = (playlists) => {
  return {
    type: actionTypes.GET_PLAYLISTS,
    payload: {
      playlists: playlists
    }
  };
};

export const getFavouritesSuccess = () => {
  return {
    type: actionTypes.GET_FAVOURITES_SUCCESS,
  };
};

export const getFavouritesFail = (error) => {
  return {
    type: actionTypes.GET_FAVOURITES_FAIL,
    payload: {
      error: error
    }
  };
};

export const getFavouritesLists = (favourites) => {
  return {
    type: actionTypes.GET_FAVOURITES,
    payload: {
      favourites: favourites
    }
  };
};

export const getCurrent = (playlist) => {
  return {
    type: actionTypes.GET_CURRENT_PLAYLIST,
    payload: {
      playlist: playlist
    }
  }
}

export const getCurrentPlaylist = (playlistId) => async (dispatch) => {
  if (typeof playlistId !== 'object') {
    try {
      const csrf = document
        .querySelector("meta[name='csrf-token']")
        .getAttribute("content");

      const response = await axios({
        method: "GET",
        url: "/api/playlists/" + playlistId,
        headers: {
          "X-CSRF-Token": csrf,
        },
      });

      dispatch(getCurrent(response.data));
      dispatch(actions.getCurrentSongsSuccess(response.data));
    } catch (err) {
      dispatch(getPlaylistsFail(err.response.data.message));
    }
  }
};

export const getPlaylists = () => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "GET",
      url: "/api/playlists",
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(getPlaylistsLists(response.data));
    dispatch(getPlaylistsSuccess());
  } catch (err) {
    dispatch(getPlaylistsFail(err.response.data.message));
  }
};

export const getFavourites = (userId) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "GET",
      url: "/api/users/favourites/" + userId,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(getFavouritesLists(response.data));
    dispatch(getFavouritesSuccess());
  } catch (err) {
    dispatch(getFavouritesFail(err.response.data.message));
  }
};

export const deletePlaylistSuccess = (feedback) => {
  return {
    type: actionTypes.DELETE_PLAYLIST_SUCCESS,
    payload: {
      feedback: feedback,
    }
  };
};

export const deletePlaylistFail = (error) => {
  return {
    type: actionTypes.DELETE_PLAYLIST_FAIL,
    payload: {
      error: error
    }
  };
};

export const deletePlaylist = (playlistId) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "DELETE",
      url: "/api/playlists/" + playlistId,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(deletePlaylistSuccess("Playlist " + playlistId + " deleted."));
    dispatch(getPlaylists());  
  } catch (err) {
    dispatch(deletePlaylistFail(err.response.data.message));
  }
};

export const updatePlaylistSuccess = (feedback) => {
  return {
    type: actionTypes.DELETE_PLAYLIST_SUCCESS,
    payload: {
      feedback: feedback,
    }
  };
};

export const updatePlaylistFail = (error) => {
  return {
    type: actionTypes.DELETE_PLAYLIST_FAIL,
    payload: {
      error: error
    }
  };
};

export const updatePlaylist = (playlistId, data) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "PATCH",
      url: "/api/playlists/" + playlistId,
      data: data,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(updatePlaylistSuccess("Playlist " + playlistId + " updated."));
    
    dispatch(getPlaylists());
    dispatch(getCurrentPlaylist(playlistId));
  } catch (err) {
    dispatch(updatePlaylistFail(err.response.data.message));
  }
};

export const addToFavourites = (userId, userData, playlistId, playlistData) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "PATCH",
      url: "/api/users/" + userId,
      data: userData,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(updatePlaylist(playlistId, playlistData))
    dispatch(updatePlaylistSuccess("Playlist " + playlistId + " added to favourites."));
    dispatch(getFavourites(userId)); 
  } catch (err) {
    dispatch(updatePlaylistFail(err.response.data.message));
  }
};

export const removeFromFavourites = (userId, userData, playlistId, playlistData) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "PATCH",
      url: "/api/users/" + userId,
      data: userData,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });

    dispatch(updatePlaylist(playlistId, playlistData))
    dispatch(updatePlaylistSuccess("Playlist " + playlistId + " removed from favourites."));
    dispatch(getFavourites(userId)); 
  } catch (err) {
    dispatch(updatePlaylistFail(err.response.data.message));
  }
};
