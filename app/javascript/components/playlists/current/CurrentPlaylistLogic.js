import React, { useState } from 'react';
import store from "../../store/store";
import * as actions from "../../store/actions";
import { validatePlaylist } from "../../../validation/createPlaylistValidation";
import { useSelector } from "react-redux";
import Song from "../../Music/Song/Song";

const useCurrentPlaylist = () => {
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);

  const handleChangeAccess = (playlistId, access) => {
    let data = {"access": access}
    store.dispatch(
      actions.updatePlaylist(
        playlistId,
        data,
      )
    );
  }

  const getPlaylists = () => {
    store.dispatch(actions.getPlaylists());
  };

  const getFavourites = (userId) => {
    if (userId) {
      store.dispatch(actions.getFavourites(userId.$oid)); 
    }
  };

  const getCurrentPlaylist = (playlistId) => {
    store.dispatch(actions.getCurrentPlaylist(playlistId));
  };

  const [playlistForm, setPlaylistForm] = useState({
    name: {
      value: "",
    },
    description: {
      value: "",
    },
  });
  const [errors, setErrors] = useState({});

  const inputChangedHandler = (event, input) => {
    const updatedForm = {
      ...playlistForm,
      [input]: {
        ...playlistForm.input,
        value: event.target.value,
      },
    };
    setPlaylistForm(updatedForm);
  };

  const submitNameHandler = (event, playlistId) => {
    event.preventDefault();
    const details = {
      name: playlistForm.name.value,
    };
    const inputErrors = validatePlaylist(details);
    if (Object.keys(inputErrors).length === 0) {
      setErrors({});
      store.dispatch(
        actions.updatePlaylist(
          playlistId,
          details,
        )
      );
      setShowEditName(false);
    } else {
      setErrors(inputErrors);
    }
  };

  const submitDescriptionHandler = (event, playlistId) => {
    event.preventDefault();
    const details = {
      description: playlistForm.description.value,
    };
    const inputErrors = validatePlaylist(details);
    if (Object.keys(inputErrors).length === 0) {
      setErrors({});
      store.dispatch(
        actions.updatePlaylist(
          playlistId,
          details,
        )
      );
      setShowEditDescription(false);
    } else {
      setErrors(inputErrors);
    }
  };

  const getSongs = (user) => {
    store.dispatch(actions.getSongs(user.username));
  };

  const viewCurrentSongs = (currentSongs) => {
    const userSongs = currentSongs.map((song) => (
      <Song key={song._id} song={song} id={song._id} inCurrent={true} />
    ));
    return userSongs;
  };

  return {
    showEditName,
    setShowEditName,
    showEditDescription,
    setShowEditDescription,
    handleChangeAccess,
    getPlaylists,
    getFavourites,
    getCurrentPlaylist,
    playlistForm,
    setPlaylistForm,
    errors,
    inputChangedHandler,
    submitNameHandler,
    submitDescriptionHandler,
    getSongs,
    viewCurrentSongs,
  };
};

export default useCurrentPlaylist;
