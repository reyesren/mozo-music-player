import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import store from "../../store/store";

const useSong = (song) => {
  const dispatch = useDispatch();

  const deleteSongHandler = (sId) => {
    dispatch(actions.deleteSong(sId));
  };

  const playSongHandler = (sId) => {
    dispatch(actions.configureSong(sId));
  };

  const handleAddToPlaylist = (playlist) => {
    let songData = {
      _id: song._id.$oid,
      songName: song.songName,
      artist: song.artist,
      length: song.length,
      songFile: song.songFile.currentSrc.replace(/%20/g, " "),
    }
    let data = {
      songs: [...playlist.songs, songData],
    }
    store.dispatch(
      actions.updatePlaylist(playlist._id.$oid, data)
    );
  };

  const handleRemoveFromPlaylist = (playlist) => {
    let data = {
      songs: playlist.songs.filter(playlistSong => playlistSong._id !== song._id),
    }
    
    store.dispatch(
      actions.updatePlaylist(playlist._id.$oid, data)
    );
  };

  return { 
    deleteSongHandler,
    playSongHandler,
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
  };
};

export default useSong;
