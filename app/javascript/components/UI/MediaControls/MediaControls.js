import React from "react";
import useMediaControls from "./MediaControlsLogic";
import { BsShuffle, BsPause } from "react-icons/bs";
import {
  FiSkipForward,
  FiSkipBack,
  FiRepeat,
  FiPlay,
  FiPause,
  FiArrowDownCircle,
  FiArrowUpCircle,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const MediaControls = (props) => {
  const {
    showControls,
    toggleMediaControlsHandler,
    togglePlayHandler,
    togglePauseHandler,
    toggleShuffleHandler,
    toggleRepeatHandler,
    toggleSkipHandler,
    toggleBackHandler,
  } = useMediaControls();

  const isPlaying = useSelector((state) => {
    return state.songs.isPlaying;
  });

  const isShuffle = useSelector((state) => {
    return state.songs.isShuffle;
  });

  const isRepeat = useSelector((state) => {
    return state.songs.isRepeat;
  });

  let mediaControls = showControls ? (
    <div className="media-controls-footer expand">
      <div className="playlist-footer-photo"></div>
      <div className="media-controls-center">
        <div className="song-details">
          <div className="song-title">SONG TITLE</div>
          <div className="song-artist">SONG ARTIST</div>
        </div>
        <div className="media-controls-container">
          <div>
            <FiSkipBack
              className="media-control-1"
              onClick={toggleBackHandler}
            ></FiSkipBack>
          </div>
          <div>
            {isPlaying ? (
              <FiPause
                className="media-control-3"
                onClick={togglePauseHandler}
              ></FiPause>
            ) : (
              <FiPlay
                className="media-control-1"
                onClick={togglePlayHandler}
              ></FiPlay>
            )}
          </div>
          <div>
            <FiSkipForward
              className="media-control-1"
              onClick={toggleSkipHandler}
            ></FiSkipForward>
          </div>
        </div>
      </div>
      <div className="media-controls-extra">
        <div>
          <BsShuffle
            className={`media-control-2 ${
              isShuffle ? "media-control-3-active" : ""
            }`}
            onClick={toggleShuffleHandler}
          ></BsShuffle>
        </div>
        <div>
          <FiRepeat
            className={`media-control-2 ${
              isRepeat ? "media-control-3-active" : ""
            }`}
            onClick={toggleRepeatHandler}
          ></FiRepeat>
        </div>
      </div>
    </div>
  ) : (
    <div className="media-controls-footer collapse-media-controls media-controls-footer-toggled"></div>
  );
  return (
    <React.Fragment>
      {mediaControls}
      <div className="expand-collapse-container">
        {showControls ? (
          <FiArrowDownCircle
            className="expand-collapse-btn fade-in"
            onClick={toggleMediaControlsHandler}
          ></FiArrowDownCircle>
        ) : (
          <FiArrowUpCircle
            className="expand-collapse-btn fade-in"
            onClick={toggleMediaControlsHandler}
          ></FiArrowUpCircle>
        )}
      </div>
    </React.Fragment>
  );
};

export default MediaControls;
