import React from 'react';
import {
  Modal,
  Button,
  Form,
  Col,
  Row
} from "react-bootstrap";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";
import usePlaylist from "./createPlaylistLogic";

const CreatePlaylist = (props) => {

  const {
    submitHandler,
    playlistForm,
    inputChangedHandler,
    errors,
    loading,
  } = usePlaylist();

  let submitButton = loading ? (
    <Spinner animation="border" role="status"></Spinner>
  ) : (
    <Button type="submit" className="btn-submit" size="lg" block>
      Create Playlist
    </Button>
  );

  return (
    <Modal
      show={props.show}
      onHide={props.toggle}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="modal"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Enter New Playlist Information
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={(e) => submitHandler(e, props.toggle)}>
          <Form.Group as={Row} controlId="playlistInfo">
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="6">
              <Form.Control 
                type="input"
                placeholder="Enter name"
                value={playlistForm.name.value}
                onChange={(e) => inputChangedHandler(e, "name")}
              />
              {errors.name ? (
                <div className="text-danger">{errors.name}</div>
              ) : null}
            </Col>

            <Col sm="4">
              <Form.Control 
                as="select"
                size="sm"
                defaultValue="public"
                onChange={(e) => inputChangedHandler(e, "access")}
                custom
              >
                <option value="public">public</option>
                <option value="private">private</option>
              </Form.Control>
              {errors.access ? (
                <div className="text-danger">{errors.access}</div>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group controlId="playlistDescription">
            <Form.Control 
              as="textarea"
              rows={8}
              placeholder="description" 
              value={playlistForm.description.value}
              onChange={(e) => inputChangedHandler(e, "description")}
            />
            {errors.description ? (
              <div className="text-danger">{errors.description}</div>
            ) : null}
          </Form.Group>

          {submitButton}
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default CreatePlaylist;
