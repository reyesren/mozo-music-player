// React imports
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

// Redux imports
import store from "./store/store";

// Bootstrap imports
import { Button, Container, Row, Col, Media } from "react-bootstrap";

// Components and logic imports
import Landing from "./Landing/Landing";
import Navigationbar from "./Navigationbar";
import Sidebar from "./playlists/sidebar/Sidebar";
import useAuthCheck from "./AuthCheck";
import CurrentPlaylist from "./playlists/current/CurrentPlaylist";
import Music from "./Music/Music";
import AccCreatedModal from "./Auth/Signup/AccCreatedModal/AccCreatedModal";
import About from "./About Us/About";
import MediaControls from "./UI/MediaControls/MediaControls";
import useMediaControls from "./UI/MediaControls/MediaControlsLogic";
import useSearch from "./Search/SearchLogic";

const App = () => {
  const { fetchLoginStatus } = useAuthCheck();
  const { toggleMediaControlsHandler } = useMediaControls();

  useEffect(() => {
    fetchLoginStatus();
  });

  const {
    handleCloseSearch,
  } =  useSearch();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  {handleCloseSearch()}
                  <Navigationbar current_page="Home" />
                  <AccCreatedModal></AccCreatedModal>
                  <div onClick={handleCloseSearch}>
                    <Landing />
                  </div>
                </>
              )}
            ></Route>
            <Route
              path="/music"
              render={() => (
                <>
                  {handleCloseSearch()}
                  <Navigationbar current_page="Music" />
                  <div onClick={handleCloseSearch}>
                    <Music />
                  </div>
                </>
              )}
            ></Route>
            <Route
              exact
              path="/playlists"
              render={() => (
                <>
                  {handleCloseSearch()}
                  <Navigationbar current_page="Playlists" />
                  <div onClick={handleCloseSearch}>
                    <Sidebar />
                  </div>
                </>
              )}
            ></Route>
            <Route
              path="/playlists/"
              render={() => (
                <>
                  {handleCloseSearch()}
                  <Navigationbar current_page="Playlists" />
                  <div onClick={handleCloseSearch}>
                    <CurrentPlaylist id={window.location.pathname.split("/").pop()}/>
                  </div>
                </>
              )}
            ></Route>
            <Route
              path="/about"
              render={() => (
                <>
                  {handleCloseSearch()}
                  <Navigationbar current_page="About" />
                  <div onClick={handleCloseSearch}>
                    <About />
                  </div>
                </>
              )}
            ></Route>
          </Switch>
        </Router>
        <MediaControls toggle={toggleMediaControlsHandler}></MediaControls>
      </Provider>
    </>
  );
};

export default App;
