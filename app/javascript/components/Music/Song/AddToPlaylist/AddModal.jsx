import React from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  Container,
  Row,
  Col,
  Media,
} from 'react-bootstrap';
import * as Bootstrap from "react-icons/bs";
import useSong from "../SongLogic";
import ModalCloseButton from "../../../UI/ModalCloseButton/ModalCloseButton";

const AddModal = (props) => {
  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const { 
    handleAddToPlaylist,
  } = useSong(props.song);

  const playlists = useSelector((state) => {
    return state.playlist.playlists;
  });

  let filteredPlaylists = playlists.filter(playlist => (playlist.user == loggedInUser));
  
  let userPlaylists = [];

  filteredPlaylists.map((playlist) => {
    var isInPlaylist = false;
    playlist.songs.forEach((song) => {
      if (song._id === props.song._id.$oid) {
        isInPlaylist = true;
      }
    })
    if (!isInPlaylist) {
      userPlaylists.push(playlist);
    }
  });

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.toggle}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="special-modal"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Add Song to a Playlist
          </Modal.Title>
          <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {userPlaylists.length > 0 ? (userPlaylists.map((playlist) => (
              <div key={playlist._id.$oid}>
                <Row
                  id={playlist._id.$oid}
                  key={playlist._id.$oid}
                  className="mb-2"
                  onClick={() => handleAddToPlaylist(playlist)}
                >
                  <Media as="button" className="search-media ml-2">
                    <Bootstrap.BsMusicNoteList className="search-image mr-3"></Bootstrap.BsMusicNoteList>
                    <Media.Body>
                      <p className="search-name">{playlist.name}</p>
                      <p className="search-user">{playlist.user}</p>
                      <p className="search-views">{playlist.num_views != 1 ? (
                                                      playlist.num_views + " views") : (
                                                        playlist.num_views + " view")}</p>
                      <p className="search-songs">{playlist.songs.length} songs</p>
                    </Media.Body>
                  </Media>
                </Row>
                <hr className="line" />
              </div>
            ))) : (
              <Row><h4 className="empty">Your song is in all your playlists already</h4></Row>
            )}
          </Container>
        </Modal.Body>

      </Modal>
    </>
  )
};

export default AddModal;
