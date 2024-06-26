import { useState } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import { validatePlaylist } from "../../../validation/createPlaylistValidation";
import store from "../../store/store";

const usePlaylist = () => {
  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const [playlistModalShow, setPlaylistModalShow] = useState(false);
  const [playlistForm, setPlaylistForm] = useState({
    name: {
      value: "",
    },
    user: {
      value: loggedInUser,
    },
    access: {
      value: "public",
    },
    description: {
      value: "",
    },
    num_views: {
      value: 0,
    },
    songs: {
      value: new Array(),
    },
    favourited_by: {
      value: new Array(),
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const submitHandler = (event, toggleCreatePlaylist) => {
    event.preventDefault();
    const details = {
      name: playlistForm.name.value,
      user: playlistForm.user.value,
      access: playlistForm.access.value,
      description: playlistForm.description.value,
      num_views: playlistForm.num_views.value,
      songs: playlistForm.songs.value,
      favourited_by: playlistForm.favourited_by.value,
    };
    const inputErrors = validatePlaylist(details);
    if (Object.keys(inputErrors).length === 0) {
      setLoading(true);
      setErrors({});
      store.dispatch(
        actions.createPlaylist(
            playlistForm.name.value,
            playlistForm.user.value,
            playlistForm.access.value,
            playlistForm.description.value,
            playlistForm.num_views.value,
            playlistForm.songs.value,
            playlistForm.favourited_by.value,
            toggleCreatePlaylist,
        )
      );
      togglePlaylistModalHandler();
      setLoading(false);

      store.dispatch(actions.getPlaylists())
    } else {
      setErrors(inputErrors);
    }
  };

  const togglePlaylistModalHandler = () => {
    setPlaylistModalShow(!playlistModalShow);
  };

  return {
    playlistModalShow,
    togglePlaylistModalHandler,
    submitHandler,
    inputChangedHandler,
    playlistForm,
    errors,
    loading
  };
};

export default usePlaylist;
