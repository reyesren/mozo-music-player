import axios from "axios";
import S3FileUpload from "react-s3";
import * as actionTypes from "../actionTypes";
// import store from "../../store";
import * as actions from "../../../store/actions";

const config = {
  bucketName: "xxxxxxxxx",
  region: "xxxxxxxxxxxxxxx",
  accessKeyId: "xxxxxxxxxxxxxxx",
  secretAccessKey: "xxxxxxxxxxxxxxxx",
};

const addSongEnd = (dispatch, getState) => {
  const currSong = getState().songs.currentlyPlaying;
  if (!currSong.hasEnd) {
    currSong.hasEnd = true;
    currSong.songFile.addEventListener("ended", () => {
      dispatch(handleEndSong());
    });
  }
};

export const togglePlaySuccess = () => {
  return {
    type: actionTypes.TOGGLE_PLAY,
  };
};

export const togglePlay = () => (dispatch, getState) => {
  let currSong = getState().songs.currentlyPlaying;
  if (currSong) dispatch(togglePlaySuccess());
};

export const endSong = (currSong) => {
  currSong.currentTime = 0;
  return {
    type: actionTypes.HANDLE_END_SONG,
  };
};

export const handleEndSong = () => (dispatch, getState) => {
  const currSong = getState().songs.currentlyPlaying.songFile;
  const queue = getState().songs.queue;
  const isRepeat = getState().songs.isRepeat;

  dispatch(endSong(currSong));
  if (queue.length > 1) {
    dispatch(playNextSong());
    addSongEnd(dispatch, getState);
  } else {
    if (isRepeat) dispatch(resetQueue());
  }
};

export const playSongSuccess = (sId) => {
  return {
    type: actionTypes.PLAY_SONG,
    songId: sId,
  };
};

export const playNextSong = () => {
  return {
    type: actionTypes.PLAY_NEXT,
  };
};

export const setPrevSongList = (prevList) => {
  return {
    type: actionTypes.SETUP_PREV,
    prevList,
  };
};

// when you first play a song by selecting dropdown
export const playSong = (sId) => (dispatch, getState) => {
  const fromPlaylist = getState().songs.fromPlaylist;
  const songsToUse = fromPlaylist
    ? getState().songs.currPlaylistSongs
    : getState().songs.songs;

  let prevList = [...songsToUse];
  const songInd = songsToUse.findIndex((song) => song._id.$oid === sId);
  prevList = prevList.slice(0, songInd);
  dispatch(setPrevSongList(prevList));
  dispatch(playSongSuccess(sId));
};

export const setQueueAllSongs = (songs, sIdToPlay) => {
  let songsCpy = [...songs];
  const indOfSong = songs.findIndex((song) => song._id.$oid === sIdToPlay);
  const newOrder = songsCpy.splice(indOfSong);
  return {
    type: actionTypes.SET_QUEUE_ALL_SONGS,
    newOrder,
  };
};

export const configureSong = (sId) => async (dispatch, getState) => {
  const fromPlaylist = getState().songs.fromPlaylist;
  let allSongs = fromPlaylist
    ? getState().songs.currPlaylistSongs
    : getState().songs.songs;
  dispatch(setQueueAllSongs(allSongs, sId));
  dispatch(playSong(sId));

  addSongEnd(dispatch, getState);
};

export const togglePause = () => {
  return {
    type: actionTypes.TOGGLE_PAUSE,
  };
};

export const toggleShuffle = () => (dispatch, getState) => {
  const fromPlaylist = getState().songs.fromPlaylist;
  let allSongs = fromPlaylist
    ? getState().songs.currPlaylistSongs
    : getState().songs.songs;
  const newQueue = [...allSongs];
  const isShuffle = getState().songs.isShuffle;

  let currSong = getState().songs.currentlyPlaying;
  if (!isShuffle) dispatch(toggleShuffleOn(newQueue));
  else dispatch(toggleShuffleOff(allSongs, currSong));
};

export const toggleShuffleOn = (queue) => {
  let newQueue = [...queue];
  newQueue = newQueue.sort(() => Math.random() - 0.5);
  return {
    type: actionTypes.TOGGLE_SHUFFLE_ON,
    newQueue,
  };
};

export const toggleShuffleOff = (allSongs, currSong) => {
  let newQueue = [];
  let prevQueue = [];
  if (!currSong) newQueue = allSongs;
  else {
    const indOfSong = allSongs.findIndex(
      (song) => song._id.$oid === currSong._id.$oid
    );
    newQueue = [...allSongs];
    newQueue = newQueue.slice(indOfSong, newQueue.length);

    prevQueue = [...allSongs];
    prevQueue = prevQueue.slice(0, indOfSong);
  }
  return {
    type: actionTypes.TOGGLE_SHUFFLE_OFF,
    newQueue,
    prevQueue,
  };
};

export const toggleRepeat = () => (dispatch, getState) => {
  const isRepeat = getState().songs.isRepeat;
  if (!isRepeat) dispatch(toggleRepeatOn());
  else dispatch(toggleRepeatOff());
};

export const toggleRepeatOn = () => {
  return {
    type: actionTypes.TOGGLE_REPEAT_ON,
  };
};

export const toggleRepeatOff = () => {
  return {
    type: actionTypes.TOGGLE_REPEAT_OFF,
  };
};

export const toggleStop = (currSong) => {
  currSong.songFile.pause();
  currSong.songFile.currentTime = 0;
  return {
    type: actionTypes.TOGGLE_STOP,
  };
};

export const toggleSkip = () => async (dispatch, getState) => {
  const currSong = getState().songs.currentlyPlaying;
  const isRepeat = getState().songs.isRepeat;

  let queue = [...getState().songs.queue];
  let nextSong;
  if (queue.length > 1) {
    queue = queue.filter((song) => {
      return song._id.$oid !== currSong._id.$oid;
    });
    nextSong = queue[0];
  } else {
    nextSong = null;
  }

  if (!currSong) dispatch(toggleSkipFail());
  else {
    dispatch(toggleStop(currSong));
    if (!nextSong) {
      if (!isRepeat) dispatch(toggleSkipFail());
      else {
        dispatch(resetQueue());
      }
    } else {
      dispatch(toggleSkipSuccess(nextSong, currSong, queue));
      dispatch(togglePlay());
      addSongEnd(dispatch, getState);
    }
  }
};

export const resetQueue = () => {
  return {
    type: actionTypes.RESET_QUEUE,
  };
};

export const resetQueueInverted = () => {
  return {
    type: actionTypes.RESET_QUEUE_INVERTED,
  };
};

export const toggleSkipSuccess = (next, prev, queue) => {
  return {
    type: actionTypes.TOGGLE_SKIP_SUCCESS,
    next,
    prev,
    queue,
  };
};

export const toggleSkipFail = () => {
  return {
    type: actionTypes.TOGGLE_SKIP_FAIL,
  };
};

export const toggleBack = () => async (dispatch, getState) => {
  const currSong = getState().songs.currentlyPlaying;
  const isRepeat = getState().songs.isRepeat;
  let queue = [...getState().songs.queue];
  let prevQueue = [...getState().songs.previousSongs];

  let nextSong;
  if (!isRepeat && prevQueue.length > 0) {
    nextSong = prevQueue.shift();
    queue.unshift(currSong);
  } else {
    nextSong = prevQueue.shift();
  }

  if (!currSong) dispatch(toggleBackFail());
  else {
    dispatch(toggleStop(currSong));
    if (!nextSong) {
      if (!isRepeat) dispatch(toggleBackFail());
      else {
        dispatch(resetQueueInverted());
      }
    } else {
      dispatch(toggleBackSuccess(nextSong, queue, prevQueue));
      dispatch(togglePlay());
      addSongEnd(dispatch, getState);
    }
  }
};

export const toggleBackSuccess = (next, queue, prevQueue) => {
  return {
    type: actionTypes.TOGGLE_BACK_SUCCESS,
    next,
    queue,
    prevQueue,
  };
};

export const toggleBackFail = () => {
  return {
    type: actionTypes.TOGGLE_BACK_FAIL,
  };
};

export const addSongSuccess = (song) => {
  return {
    type: actionTypes.ADD_SONG_SUCCESS,
    song,
  };
};

export const getSongsSuccess = (songs) => {
  return {
    type: actionTypes.GET_SONGS_SUCCESS,
    payload: {
      songs: songs,
    },
  };
};

export const getSongsFail = (error) => {
  return {
    type: actionTypes.GET_SONGS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const getSongsLists = (songs) => {
  return {
    type: actionTypes.GET_SONGS,
    payload: {
      songs: songs,
    },
  };
};

export const getSongs = (username) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "GET",
      url: "/api/songs",
      headers: {
        "X-CSRF-Token": csrf,
      },
      params: {
        user: username,
      },
    });
    let songs = response.data;
    songs.forEach((song) => {
      song.songFile = new Audio(song.songFile);
      song.hasEnd = false;
    });
    // console.log(songs);
    dispatch(getSongsSuccess(response.data));
  } catch (err) {
    console.log(err);
    // dispatch(getSongsFail(err.response.data.message));
  }
};

export const getCurrentSongsSuccess = (playlist) => {
  return {
    type: actionTypes.GET_CURRENT_SONGS,
    payload: {
      currPlaylistSongs: playlist.songs,
    },
  };
};

export const addSong = (songDetails) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const songToUpload = songDetails.source;
    const responseS3 = await S3FileUpload.uploadFile(songToUpload, config);

    const songRequest = {
      song: {
        songName: songDetails.name,
        artist: songDetails.artist,
        length: songDetails.length,
        user: songDetails.user,
        songFile: responseS3.location,
      },
    };

    const response = await axios({
      method: "POST",
      url: "/api/songs",
      data: songRequest,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });
    let songToAdd = response.data;
    songToAdd.songFile = new Audio(songToAdd.songFile);
    songToAdd.hasEnd = false;
    dispatch(addSongSuccess(songToAdd));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const deleteSongsSuccess = (sId) => {
  return {
    type: actionTypes.DELETE_SONGS_SUCCESS,
    payload: {
      feedback: "Successfully deleted song.",
      songId: sId,
    },
  };
};

export const deleteSongsFail = (error) => {
  return {
    type: actionTypes.DELETE_SONGS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const deleteSong = (songId) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");

    const response = await axios({
      method: "DELETE",
      url: "/api/songs/" + songId,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });
    // console.log(response);
    dispatch(deleteSongsSuccess(songId));
  } catch (err) {
    console.log("I ENTER HERE");
    console.log(err.response);
    // dispatch(deleteSongFail(err.response.data.message));
  }
};
