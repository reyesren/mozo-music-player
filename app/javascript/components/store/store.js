import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducers/auth";
import createPlaylistReducer from "./reducers/playlists/createPlaylist";
import playlistReducer from "./reducers/playlists/playlist";
import songsReducer from "./reducers/songs/songs";
import searchReducer from "./reducers/search";
import thunk from "redux-thunk";

// const composeEnhancers =
//   (process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
  createPlaylist: createPlaylistReducer,
  songs: songsReducer,
  search: searchReducer,
});

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
