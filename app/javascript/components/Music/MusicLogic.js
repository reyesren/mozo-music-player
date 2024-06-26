import React, { useState } from "react";
import Song from "./Song/Song";
import * as actions from "../store/actions/index";
// import store from "../store/store";
import { useSelector, useDispatch } from "react-redux";

const useMusic = (loggedInUser) => {
  const [loading, useLoading] = useState(true);

  const dispatch = useDispatch();

  const getSongs = (loggedInUser) => {
    dispatch(actions.getSongs(loggedInUser));
  };

  const songs = useSelector((state) => {
    return state.songs.songs;
  });

  const viewSongs = () => {
    const userSongs = songs.map((song) => (
      <Song key={song._id.$oid} song={song} id={song._id.$oid} inCurrent={false} />
    ));
    return userSongs;
  };

  return {
    getSongs,
    viewSongs,
    loading,
    useLoading,
    songs,
  };
};

export default useMusic;
