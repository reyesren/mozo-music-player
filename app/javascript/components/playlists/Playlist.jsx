import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Media,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import * as Bootstrap from "react-icons/bs";
import usePlaylist from "./PlaylistLogic";
import useCurrentPlaylist from "./current/CurrentPlaylistLogic";
import Share from "./share/Share";
import useShare from "./share/ShareLogic";

const Playlist = (props) => {

  const user = useSelector((state) => {
    return state.auth.user;
  });

  const {
    getPlaylistUsername,
    checkIsFavourited,
    handlePlaylistClick,
    deletePlaylist,
    handlePlayAll,
    handleShuffle,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    handleShare,
  } = usePlaylist(user, props.info);

  const {
    handleChangeAccess,
  } = useCurrentPlaylist();

  const favourites =  (!checkIsFavourited() ? 
    <Dropdown.Item className="options-item" onClick={handleAddToFavourites}>Add To Favourites</Dropdown.Item>
    : <Dropdown.Item className="options-item" onClick={handleRemoveFromFavourites}>Remove From Favourites</Dropdown.Item>
  )

  const {
    shareModalShow,
    toggleShareModalHandler,
  } = useShare();

  const shareModal = shareModalShow ? (
    <Share show={shareModalShow} toggle={toggleShareModalHandler} />
  ) : null;

  if (!props.search) {
    return (
      <>
        <Container fluid>
          <Row className="mt-4 ml-1 mb-4">
            <Col xs={10} sm={10}>
              <a className="media-link" href={"/playlists/" + props.info._id.$oid}>
                <Media as="button" className="media" onClick={handlePlaylistClick}>
                  <Bootstrap.BsMusicNoteList className="align-self-start song-image mr-3"></Bootstrap.BsMusicNoteList>
                  <Media.Body>
                    <p className="playlist-font">{props.info.name}</p>
                    <p className="playlist-user">{getPlaylistUsername()}</p>
                    <p className="playlist-user">{props.info.num_views != 1 ? (
                                                    props.info.num_views + " views") : (
                                                      props.info.num_views + " view")}</p>
                    <p className="playlist-num-songs">{props.info.songs.length} songs</p>
                  </Media.Body>
                </Media>
              </a>
            </Col>

            <Col xs={1} sm={1}>
              {!props.landing ? (
                props.info.access === "public" ? (
                  <OverlayTrigger 
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        public
                      </Tooltip>
                    }
                  >
                    <Bootstrap.BsUnlockFill 
                      className="options access-lock"
                      onClick={() => {handleChangeAccess(props.info._id.$oid, "private")}}
                    ></Bootstrap.BsUnlockFill>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger 
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        private
                      </Tooltip>
                    }
                  >
                    <Bootstrap.BsLockFill
                      className="options access-lock"
                      onClick={() => {handleChangeAccess(props.info._id.$oid, "public")}}
                    ></Bootstrap.BsLockFill>
                  </OverlayTrigger>
              )) : null}
            </Col>
                
            <Col xs={1} sm={1}>
              <Row>
                  <Dropdown
                    drop="right"
                    className="ml-auto"
                  >
                    <Dropdown.Toggle variant="none" className="dropdown-options">
                      <Bootstrap.BsThreeDotsVertical
                        className="more-options"
                      >
                      </Bootstrap.BsThreeDotsVertical>
                    </Dropdown.Toggle>
                      
                    <Dropdown.Menu className="song-options">
                      {!props.landing && !props.sidebar ? <Dropdown.Item className="options-item" onClick={handlePlayAll}>Play All</Dropdown.Item> : null}
                      {!props.landing && !props.sidebar ? <Dropdown.Item className="options-item" onClick={handleShuffle}>Shuffle</Dropdown.Item> : null}
                      {favourites}
                      {!props.landing ? <Dropdown.Item className="options-item" onClick={toggleShareModalHandler}>Share</Dropdown.Item> : null}
                      {shareModal}
                      {!props.landing ? <Dropdown.Item className="options-item" onClick={deletePlaylist}>Delete</Dropdown.Item> :  null}
                      
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
            </Col>
          </Row>
          <hr className="line" />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <a className="media-link" href={"/playlists/" + props.info._id.$oid}>
          <Media as="button" className="search-media" onClick={handlePlaylistClick}>
            <Bootstrap.BsMusicNoteList className="search-image mr-3"></Bootstrap.BsMusicNoteList>
            <Media.Body>
              <p className="search-name">{props.info.name}</p>
              <p className="search-user">{getPlaylistUsername()}</p>
              <p className="search-views">{props.info.num_views != 1 ? (
                                              props.info.num_views + " views") : (
                                                props.info.num_views + " view")}</p>
              <p className="search-songs">{props.info.songs.length} songs</p>
            </Media.Body>
          </Media>
        </a>
      </>
    )
  }

};

Playlist.propTypes = {
  info: PropTypes.object,
  landing: PropTypes.bool,
  sidebar:  PropTypes.bool,
  search: PropTypes.bool,
};

export default Playlist;
