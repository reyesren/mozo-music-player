import React, { useEffect } from 'react';
import { 
  Button, 
  Container, 
  Row, 
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import usePlaylist from "../create/createPlaylistLogic";
import CreatePlaylist from "../create/CreatePlaylist";
import usePlaylists from "./SidebarLogic";

const Sidebar = () => {
  const { togglePlaylistModalHandler, playlistModalShow } = usePlaylist();

  const playlistModal = playlistModalShow ? (
    <CreatePlaylist show={playlistModalShow} toggle={togglePlaylistModalHandler} />
  ) : null;

  const isLoggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  const loggedInUser = useSelector((state) => {
    return state.auth.user;
  });

  const userId = useSelector((state) => {
    return state.auth.user._id;
  });

  const {
    getPlaylists,
    getFavourites,
    toggleMyPlaylists,
    toggleMyFavourites,
    toggleShowMyPlaylist,
    toggleShowMyFavourites,
    togglePlaylistsArrow,
    toggleFavouritesArrow,
    viewMyPlaylists,
    viewMyFavourites,
    showCurrentPlaylist,
  } = usePlaylists(loggedInUser.username);

  useEffect(() => {
    getPlaylists();
    getFavourites(userId);
  }, [playlists, favourites, loggedInUser]);

  const playlists = useSelector((state) => {
    return state.playlist.playlists;
  });

  const favourites = useSelector((state) => {
    return state.playlist.favourites;
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4} sm={4} lg={3} xl={2} className="left-col">
            <Row className="mt-3">
              <Col xs={9} sm={10}>
                <Button 
                  className="my-playlists left-align-item mb-0"
                  variant="outline-light"
                  onClick={toggleShowMyPlaylist}
                  block
                >
                  My Playlists
                </Button>
              </Col>
              <Col xs={3} sm={2}>
                <button className="toggleList" onClick={toggleMyPlaylists}>
                  {togglePlaylistsArrow}
                </button>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <div className="playlist-scrollable">
                  {viewMyPlaylists(playlists, true)}
                </div>
              </Col>
            </Row>

            <Row className="mt-5 mb-2">
              {isLoggedIn ? (<Button 
                className="new-playlist ml-auto mr-auto"
                variant="light"
                onClick={togglePlaylistModalHandler}
              >
                Create New Playlist
              </Button>) : null}
              {playlistModal}
            </Row>

            <Row className="mt-5 mb-3">
              <Col xs={9} sm={10}>
                <Button 
                  className="my-playlists left-align-item"
                  variant="outline-light"
                  onClick={toggleShowMyFavourites}
                  block
                >
                  My Favourites
                </Button>
              </Col>
              <Col xs={3} sm={2}>
                <button className="toggleList" onClick={toggleMyFavourites}>
                  {toggleFavouritesArrow}
                </button>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <div className="playlist-scrollable">
                  {viewMyFavourites(favourites, true)}
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={8} sm={8} lg={9} xl={10} className="right-col" id="playlist-container">
            {showCurrentPlaylist ? (
              viewMyPlaylists(playlists, false)) : viewMyFavourites(favourites, false)
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sidebar;
