import axios from "axios";
import * as actionTypes from "../actionTypes";
import * as actions from "../index";
import { getPlaylists } from "./playlist";

export const playlistCreationStart = () => {
  return {
    type: actionTypes.PLAYLIST_CREATION_START,
  };
};

export const playlistCreationSuccess = () => {
  return {
    type: actionTypes.PLAYLIST_CREATION_SUCCESS,
  };
};

export const playlistCreationFail = (error) => {
  return {
    type: actionTypes.PLAYLIST_CREATION_FAIL,
    error: error,
  };
};

export const createPlaylist = (
  name,
  user,
  access,
  description,
  num_views,
  songs,
  favourited_by,
  toggleCreatePlaylist,
) => async (dispatch) => {
  try {
    dispatch(playlistCreationStart());
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");
    const url = "http://localhost:3000/api/playlists";
    const playlistData = {
      playlist: { name, user, access, description, num_views, songs, favourited_by }
    };

    const response = await axios({
      method: "POST",
      url: "/api/playlists",
      data: playlistData,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });
    
    // dispatch this action if creation works
    dispatch(playlistCreationSuccess());
    dispatch(actions.getPlaylists());
    toggleCreatePlaylist();

  } catch (err) {
    // creation failed
    dispatch(playlistCreationFail(err.response.data.message));
  }
};
