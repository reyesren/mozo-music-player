import * as actionTypes from "../../actions/actionTypes";

const initialState = {
  songs: [],
  currPlaylistSongs: [],
  queue: [],
  currentlyPlaying: null,
  deletion: "",
  errors: "",
  fromPlaylist: false,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
  previousSongs: [], // stack
};

const togglePlay = (state, action) => {
  state.currentlyPlaying.songFile.play();
  return {
    ...state,
    isPlaying: true,
  };
};

const playSong = (state, action) => {
  let songToPlay = state.songs.find((song) => song._id.$oid === action.songId);
  if (state.isPlaying) {
    state.currentlyPlaying.songFile.pause();
    state.currentlyPlaying.songFile.currentTime = 0;
  }
  songToPlay.songFile.play();
  return {
    ...state,
    isPlaying: true,
    currentlyPlaying: songToPlay,
  };
};

const playNext = (state, action) => {
  let newQueue = [...state.queue];
  let newPrev = [...state.previousSongs];
  newQueue.shift();
  const newCurr = newQueue[0];
  newCurr.songFile.play();
  newPrev.unshift(newCurr);
  return {
    ...state,
    isPlaying: true,
    currentlyPlaying: newCurr,
    queue: newQueue,
    previousSongs: newPrev,
  };
};

const handleEndSong = (state, action) => {
  // let newQueue = [...state.queue];
  // newQueue
  return {
    ...state,
    isPlaying: false,
  };
};

const togglePause = (state, action) => {
  state.currentlyPlaying.songFile.pause();
  return {
    ...state,
    isPlaying: false,
  };
};

const toggleShuffleOn = (state, action) => {
  return {
    ...state,
    queue: action.newQueue,
    isShuffle: true,
    isRepeat: false,
    previousSongs: [],
  };
};

const toggleShuffleOff = (state, action) => {
  return {
    ...state,
    queue: action.newQueue,
    isShuffle: false,
    previousSongs: action.prevQueue,
  };
};

const toggleRepeatOn = (state, action) => {
  return {
    ...state,
    isRepeat: true,
    isShuffle: false,
  };
};

const toggleRepeatOff = (state, action) => {
  return {
    ...state,
    isRepeat: false,
  };
};

const resetQueue = (state, action) => {
  const newQueue = state.fromPlaylist
    ? [...state.currPlaylistSongs]
    : [...state.songs];
  const newSong = newQueue[0];
  newSong.songFile.play();
  return {
    ...state,
    queue: newQueue,
    currentlyPlaying: newSong,
    isPlaying: true,
  };
};

const resetQueueInverted = (state, action) => {
  let newQueue = state.fromPlaylist
    ? [...state.currPlaylistSongs]
    : [...state.songs];
  newQueue.reverse();
  let prevQueue = [...newQueue];
  prevQueue.shift();
  const newSong = newQueue[0];
  newSong.songFile.play();
  return {
    ...state,
    queue: newQueue,
    currentlyPlaying: newSong,
    isPlaying: true,
    previousSongs: prevQueue,
  };
};

const toggleStop = (state, action) => {
  return {
    ...state,
    currentlyPlaying: null,
  };
};

const toggleSkipSuccess = (state, action) => {
  let songToPlay = action.next;
  let prevSong = action.prev;
  let updatedPrev = [...state.previousSongs];
  updatedPrev.unshift(prevSong);

  return {
    ...state,
    currentlyPlaying: songToPlay,
    queue: action.queue,
    previousSongs: updatedPrev,
  };
};

const toggleSkipFail = (state, action) => {
  return {
    ...state,
    currentlyPlaying: null,
    queue: [],
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
  };
};

const toggleBackSuccess = (state, action) => {
  let songToPlay = action.next;
  return {
    ...state,
    currentlyPlaying: songToPlay,
    queue: action.queue,
    previousSongs: action.prevQueue,
  };
};

const toggleBackFail = (state, action) => {
  return {
    ...state,
    currentlyPlaying: null,
    queue: [],
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
  };
};

const getSongsSuccess = (state, action) => {
  return {
    ...state,
    songs: action.payload.songs,
    fromPlaylist: false,
  };
};

const getSongsFail = (state, action) => {
  return {
    ...state,
    fail: true,
    error: action.payload.error,
  };
};

const getCurrentSongs = (state, action) => {
  const playlistSongs = [...action.payload.currPlaylistSongs];
  playlistSongs.forEach((song) => {
    song.songFile = new Audio(song.songFile);
    song.hasEnd = false;
  });
  return {
    ...state,
    currPlaylistSongs: action.payload.currPlaylistSongs,
  };
};

const addSongSuccess = (state, action) => {
  let newSongsList = [...state.songs];
  let newQueue = [...state.queue];
  newSongsList.push(action.song);
  newQueue.push(action.song);
  return {
    ...state,
    songs: newSongsList,
    queue: newQueue,
  };
};

const getSongsList = (state, action) => {
  return {
    ...state,
    playlists: action.payload.playlists,
  };
};

const deleteSongsSuccess = (state, action) => {
  const newSongsList = state.songs.filter(
    (song) => song._id.$oid !== action.payload.songId
  );
  return {
    ...state,
    deletion: action.payload.feedback,
    songs: newSongsList,
  };
};

const deleteSongsFail = (state, action) => {
  return {
    ...state,
    error: action.payload.error,
  };
};

const setQueueRepeat = (state, action) => {
  return {
    ...state,
    queue: action.newOrder,
  };
};

const setQueueAllSongs = (state, action) => {
  return {
    ...state,
    queue: action.newOrder,
  };
};

const setPrevSongList = (state, action) => {
  return {
    ...state,
    previousSongs: action.prevList,
  };
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SONGS_SUCCESS:
      return getSongsSuccess(state, action);
    case actionTypes.GET_SONGS_FAIL:
      return getSongsFail(state, action);
    case actionTypes.GET_CURRENT_SONGS:
      return getCurrentSongs(state, action);
    case actionTypes.ADD_SONG_SUCCESS:
      return addSongSuccess(state, action);
    case actionTypes.DELETE_SONGS_SUCCESS:
      return deleteSongsSuccess(state, action);
    case actionTypes.DELETE_SONGS_FAIL:
      return deleteSongsFail(state, action);
    case actionTypes.TOGGLE_PLAY:
      return togglePlay(state, action);
    case actionTypes.TOGGLE_PAUSE:
      return togglePause(state, action);
    case actionTypes.PLAY_SONG:
      return playSong(state, action);
    case actionTypes.PLAY_NEXT:
      return playNext(state, action);
    case actionTypes.TOGGLE_SHUFFLE_ON:
      return toggleShuffleOn(state, action);
    case actionTypes.TOGGLE_SHUFFLE_OFF:
      return toggleShuffleOff(state, action);
    case actionTypes.TOGGLE_REPEAT_ON:
      return toggleRepeatOn(state, action);
    case actionTypes.TOGGLE_REPEAT_OFF:
      return toggleRepeatOff(state, action);
    case actionTypes.TOGGLE_STOP:
      return toggleStop(state, action);
    case actionTypes.TOGGLE_SKIP_SUCCESS:
      return toggleSkipSuccess(state, action);
    case actionTypes.TOGGLE_SKIP_FAIL:
      return toggleSkipFail(state, action);
    case actionTypes.TOGGLE_BACK_SUCCESS:
      return toggleBackSuccess(state, action);
    case actionTypes.TOGGLE_BACK_FAIL:
      return toggleBackFail(state, action);
    case actionTypes.HANDLE_END_SONG:
      return handleEndSong(state, action);
    case actionTypes.SET_QUEUE_ALL_SONGS:
      return setQueueAllSongs(state, action);
    case actionTypes.SETUP_PREV:
      return setPrevSongList(state, action);
    case actionTypes.RESET_QUEUE:
      return resetQueue(state, action);
    case actionTypes.RESET_QUEUE_INVERTED:
      return resetQueueInverted(state, action);
    default:
      return state;
  }
};

export default songsReducer;
