import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Dropdown,
    Button,
    Form,
    OverlayTrigger,
    Tooltip,
  } from "react-bootstrap";
import * as Bootstrap from "react-icons/bs";
import { useSelector } from "react-redux";
import useCurrentPlaylist from './CurrentPlaylistLogic';
import usePlaylist from "../PlaylistLogic";
import Share from "../share/Share";
import useShare from "../share/ShareLogic";

const CurrentPlaylist = (props) => {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  const {
    showEditName,
    setShowEditName,
    showEditDescription,
    setShowEditDescription,
    handleChangeAccess,
    getCurrentPlaylist,
    playlistForm,
    setPlaylistForm,
    errors,
    inputChangedHandler,
    submitNameHandler,
    submitDescriptionHandler,
    getSongs,
    viewCurrentSongs,
  } = useCurrentPlaylist();

  useEffect(() => {
    getCurrentPlaylist(props.id);
    if (typeof currentPlaylist !== 'undefined' && currentPlaylist !== null) {
      setPlaylistForm({
        ...playlistForm,
        name: {
          ...playlistForm.name,
          value: currentPlaylist.name
        }, 
        description: {
          ...playlistForm.description,
          value: currentPlaylist.description
        }
      });
      getSongs(user);
    }
  }, [currentPlaylist, user]);

  const currentPlaylist = useSelector((state) => {
    return state.playlist.current;
  });

  const currentSongs = useSelector((state) => {
    return state.songs.currPlaylistSongs;
  });

  const {
    getPlaylistUsername,
    checkIsFavourited,
    deletePlaylist,
    handlePlayAll,
    handleShuffle,
    handleAddToFavourites,
    handleRemoveFromFavourites,
  } =  usePlaylist(user, currentPlaylist);

  const favourites =  (!checkIsFavourited() ?
    <Dropdown.Item className="options-item" onClick={handleAddToFavourites}>Add To Favourites</Dropdown.Item>
    : <Dropdown.Item className="options-item" onClick={handleRemoveFromFavourites}>Remove From Favourites</Dropdown.Item>
  )

  const saveButton = <Button type="submit" variant="light" className="ml-auto mr-auto">Save</Button>
  const cancelButton = <Button 
                          variant="light"
                          className="ml-auto mr-auto"
                          onClick={() => {
                                            showEditDescription ? setShowEditDescription(false): null;
                                            showEditName ? setShowEditName(false) : null;
                                          }}
                        >
                          Cancel
                        </Button>

  const {
    shareModalShow,
    toggleShareModalHandler,
  } = useShare();

  const shareModal = shareModalShow ? (
    <Share show={shareModalShow} toggle={toggleShareModalHandler} />
  ) : null;
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4} sm={4} lg={3} xl={2} className="left-info">
            <Row>
              <Bootstrap.BsMusicNoteList className="image"></Bootstrap.BsMusicNoteList>
            </Row>
            
            <Row className="mt-2">
              <Col xs="8" sm="8">
                {showEditName ? (
                  <Form noValidate onSubmit={(e) => submitNameHandler(e, currentPlaylist._id.$oid)}>
                    <Form.Group controlId="playlistDescription">
                      <Form.Control 
                        type="input"
                        value={playlistForm.name.value}
                        onChange={(e) => inputChangedHandler(e, "name")}
                      />
                      {errors.name ? (
                        <div className="text-danger">{errors.name}</div>
                      ) : null}
                    </Form.Group>

                    <Row className="mb-2">
                      {cancelButton}
                      {saveButton}
                    </Row>
                      
                  </Form>
                ) : <p className="playlist-name pt-1">{currentPlaylist ? currentPlaylist.name : null}</p>}
              </Col>
              <Col xs="1" sm="1" className="pl-0 pr-0">
                {getPlaylistUsername() == user.username ? (
                  <button className="options pl-0" onClick={() => {setShowEditName(true)}}>
                    <Bootstrap.BsPencilSquare></Bootstrap.BsPencilSquare>
                  </button>
                ) : null}
              </Col>

              <Col xs="1" sm="1" className="pl-0 pr-0">
                <button className="options pl-0" onClick={handlePlayAll}>
                  <Bootstrap.BsFillPlayFill></Bootstrap.BsFillPlayFill>
                </button>
              </Col>

              <Col xs="1" sm="1" className="pl-0 pr-0">
                <button className="options pl-0" onClick={handleShuffle}>
                  <Bootstrap.BsShuffle></Bootstrap.BsShuffle>
                </button>
              </Col>

              <Col xs="1" sm="1" className="pl-0 pr-0">
                <Dropdown
                  drop="right"
                >
                  <Dropdown.Toggle variant="none" className="options-toggle">
                    <Bootstrap.BsThreeDotsVertical
                      className="options"
                    >
                    </Bootstrap.BsThreeDotsVertical>
                  </Dropdown.Toggle>
                    
                  <Dropdown.Menu className="song-options">
                    {favourites}
                    {getPlaylistUsername() == user.username ? <Dropdown.Item className="options-item" onClick={toggleShareModalHandler}>Share</Dropdown.Item> : null}
                    {shareModal}
                    {getPlaylistUsername() == user.username? (
                      <Dropdown.Item className="options-item" href={"/playlists/"} onClick={deletePlaylist}>Delete</Dropdown.Item>
                    ) : null}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            <Row>
              <Col xs="11" sm="11">
                <p className="playlist-username">{user ? getPlaylistUsername() : null}</p>
              </Col>

              <Col xs="1" sm="1" className="pl-0 pr-2">
                {currentPlaylist ? (
                    currentPlaylist.access === "public" ? (
                      <OverlayTrigger 
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            public
                          </Tooltip>
                        }
                      >
                        <Bootstrap.BsUnlockFill 
                          className="options"
                          onClick={() => {handleChangeAccess(currentPlaylist._id.$oid, "private")}}
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
                          className="options"
                          onClick={() => {handleChangeAccess(currentPlaylist._id.$oid, "public")}}
                        ></Bootstrap.BsLockFill>
                      </OverlayTrigger>
                  )) : null}
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <p className="playlist-description">{currentPlaylist ? (
                                                      currentPlaylist.num_views > 1 ? (
                                                        currentPlaylist.num_views + " views") : (
                                                          currentPlaylist.num_views + " view")) : null}</p>
              </Col>
            </Row>

            <Row>
              <Col xs="11" sm="11" className="vertical-overflow">
                {showEditDescription ? (
                  <Form noValidate onSubmit={(e) => submitDescriptionHandler(e, currentPlaylist._id.$oid)}>
                    <Form.Group controlId="playlistDescription">
                      <Form.Control 
                        as="textarea"
                        rows={4}
                        value={playlistForm.description.value}
                        onChange={(e) => inputChangedHandler(e, "description")}
                      />
                      {errors.description ? (
                        <div className="text-danger">{errors.description}</div>
                      ) : null}
                    </Form.Group>

                    <Row>
                      {cancelButton}
                      {saveButton}
                    </Row>
                      
                  </Form>
                ) : <p className="playlist-description pt-1">{currentPlaylist ? currentPlaylist.description : null}</p>}
              </Col>

              <Col xs="1" sm="1" className="pl-0 pr-1">
                {getPlaylistUsername() == user.username? (
                  <button className="options pl-0" onClick={() => {setShowEditDescription(true)}}>
                    <Bootstrap.BsPencilSquare></Bootstrap.BsPencilSquare>
                  </button>
                ) : null}
              </Col>
            </Row>
          </Col>

          <Col xs={8} sm={8} lg={9} xl={10}>
            {currentPlaylist ? viewCurrentSongs(currentSongs) : null}
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default CurrentPlaylist;