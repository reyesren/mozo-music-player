import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Media,
  Dropdown,
  Overlay,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import useSong from "./SongLogic";
import * as Bootstrap from "react-icons/bs";
import AddModal from "./AddToPlaylist/AddModal";
import useAddModal from "./AddToPlaylist/AddModalLogic.js"

const Song = (props) => {
  const { 
    deleteSongHandler,
    playSongHandler,
    handleRemoveFromPlaylist,
  } = useSong(props.song);

  const { 
    addModalShow,
    toggleAddModalHandler,
  } = useAddModal();

  const currentPlaylist = useSelector((state) => {
    return state.playlist.current;
  });

  const addModal = addModalShow ? (
    <AddModal show={addModalShow} toggle={toggleAddModalHandler} song={props.song} />
  ) : null;

  return (
    <>
      <Container fluid>
        <Row className="mt-4 mb-4">
          <Col xs={11} sm={11}>
            <Media as="button" className="media ml-1">
              <Bootstrap.BsMusicNoteBeamed className="align-self-start song-image mr-3"></Bootstrap.BsMusicNoteBeamed>
              <Media.Body>
                <p className="song-font">{props.song.songName}</p>
                <p className="song-artist">{props.song.artist}</p>
                <p className="song-length">{props.song.length}</p>
              </Media.Body>
            </Media>
          </Col>

          <Col xs={1} sm={1}>
            <Row>
              <Dropdown drop="right" className="ml-auto">
                <Dropdown.Toggle variant="none" className="dropdown-options">
                  <Bootstrap.BsThreeDotsVertical className="more-options"></Bootstrap.BsThreeDotsVertical>
                </Dropdown.Toggle>

                <Dropdown.Menu className="song-options">
                  <Dropdown.Item
                    className="options-item"
                    onClick={() => playSongHandler(props.id)}
                  >
                    Play
                  </Dropdown.Item>
                  <Dropdown.Item className="options-item">
                    Add to Queue
                  </Dropdown.Item>
                  {!props.inCurrent ? (
                    <Dropdown.Item className="options-item" onClick={toggleAddModalHandler}>
                      Add to Playlist
                      {addModal}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item className="options-item" onClick={() => {handleRemoveFromPlaylist(currentPlaylist)}}>
                      Remove from playlist
                    </Dropdown.Item>
                  )}
                  
                  {!props.inCurrent ? (
                    <Dropdown.Item
                      className="options-item"
                      onClick={() => deleteSongHandler(props.id)}
                    >
                      Delete
                    </Dropdown.Item>
                    ) : null
                  }
                  
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </Col>
        </Row>
        <hr className="line" />
      </Container>
    </>
  );
};

Song.propTypes = {
  song: PropTypes.object,
  inCurrent: PropTypes.bool,
};

export default Song;
