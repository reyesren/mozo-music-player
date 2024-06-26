import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useUpload from "./Upload/UploadSongLogic";
import UploadSong from "./Upload/UploadSong";
import useMusic from "./MusicLogic";
import * as actions from "../store/actions/index";
import FlashMessage from "react-flash-message";

const Music = () => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const { toggleUploadModalHandler, uploadModalShow } = useUpload();

  const { viewSongs, getSongs, loading, useLoading, songs } = useMusic(
    loggedInUser
  );

  useEffect(() => {
    if (loggedInUser) {
      getSongs(loggedInUser);
      useLoading(false);
    }
  }, [loggedInUser, loading]);

  const uploadModal = uploadModalShow ? (
    <UploadSong show={uploadModalShow} toggle={toggleUploadModalHandler} />
  ) : null;

  return (
    <>
      <Container>
        {/*<div className="flash-msg-container">
          <p>Flash message is here</p>
  </div>*/}
        <Row className="mt-5 mb-3">
          <Col>
            <Button
              className="new-music mr-auto"
              variant="light"
              onClick={toggleUploadModalHandler}
            >
              Add New Music
            </Button>
            {uploadModal}
          </Col>

          <Col>
            <Row>
              <Dropdown className="ml-auto mr-3">
                <Dropdown.Toggle
                  variant="none"
                  className="sort-dropdown-toggle"
                >
                  Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu variant="light" className="sort-dropdown-menu">
                  <Dropdown.Item className="sort-dropdown-item">
                    Oldest
                  </Dropdown.Item>
                  <Dropdown.Item className="sort-dropdown-item">
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item className="sort-dropdown-item">
                    Name: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item className="sort-dropdown-item">
                    Name: Z-A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </Col>
        </Row>
        <Row className="mb-2 vertical-overflow">{!loading && viewSongs()}</Row>
      </Container>
    </>
  );
};

export default Music;
