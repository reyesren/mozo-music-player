import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import store from "../../store/store";
import { useSelector } from "react-redux";

const useMediaControls = () => {
  const [showControls, setShowControls] = useState(true);

  // const isShuffle = useSelector((state) => {
  //   if (!state.songs) return null;
  //   else return state.songs.isShuffle;
  // });

  const toggleMediaControlsHandler = () => {
    setShowControls(!showControls);
  };

  const togglePauseHandler = () => {
    store.dispatch(actions.togglePause());
  };

  const togglePlayHandler = () => {
    store.dispatch(actions.togglePlay());
  };

  const toggleShuffleHandler = () => {
    store.dispatch(actions.toggleShuffle());
  };

  const toggleRepeatHandler = () => {
    store.dispatch(actions.toggleRepeat());
  };

  const toggleSkipHandler = () => {
    store.dispatch(actions.toggleSkip());
  };

  const toggleBackHandler = () => {
    store.dispatch(actions.toggleBack());
  };

  return {
    toggleMediaControlsHandler,
    showControls,
    togglePlayHandler,
    togglePauseHandler,
    toggleShuffleHandler,
    toggleRepeatHandler,
    toggleSkipHandler,
    toggleBackHandler,
  };
};

export default useMediaControls;
