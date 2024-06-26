import React from "react";
import { Modal, Button, Form, Col, Row, ButtonGroup } from "react-bootstrap";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";
import useUpload from "./UploadSongLogic";

const UploadSong = (props) => {
  const {
    toggleSourceHandler,
    toggleUrlHandler,
    sourceOrUrl,
    submitHandler,
    uploadForm,
    inputChangedHandler,
    errors,
    loading,
  } = useUpload();

  let submitButton = loading ? (
    <Spinner animation="border" role="status"></Spinner>
  ) : (
    <Button type="submit" className="btn-submit" size="lg" block>
      Upload Song
    </Button>
  );

  let uploadWithSource = sourceOrUrl ? (
    <Form.Group as={Row} controlId="uploadSource">
      <Form.Label column sm="2">
        Source
      </Form.Label>
      <Col sm="10">
        <Form.File
          id="sourceFile"
          lang="en"
          onChange={(e) => inputChangedHandler(e, "source")}
        />
        {errors.source ? (
          <div className="text-danger">{errors.source}</div>
        ) : null}
      </Col>
    </Form.Group>
  ) : (
    <Form.Group as={Row} controlId="uploadSource">
      <Form.Label column sm="1">
        Link
      </Form.Label>
      <Col sm="11">
        <Form.Control
          as="input"
          placeholder="Enter url"
          value={uploadForm.url.value}
          onChange={(e) => inputChangedHandler(e, "url")}
        />
        {errors.url ? <div className="text-danger">{errors.url}</div> : null}
      </Col>
    </Form.Group>
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
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter New Song Information
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={(e) => submitHandler(e, props.toggle)}>
          <Form.Group as={Row} controlId="uploadInfo">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="input"
                placeholder="Enter name"
                value={uploadForm.name.value}
                onChange={(e) => inputChangedHandler(e, "name")}
              />
              {errors.name ? (
                <div className="text-danger">{errors.name}</div>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="uploadArtist">
            <Form.Label column sm="2">
              Artist
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="input"
                placeholder="Enter artist's name"
                value={uploadForm.artist.value}
                onChange={(e) => inputChangedHandler(e, "artist")}
              />
              {errors.artist ? (
                <div className="text-danger">{errors.artist}</div>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group>
            <Row>
              <Form.Label className="upload-from">Upload From</Form.Label>
            </Row>

            <Row>
              <ButtonGroup className="source-or-url">
                <Button variant="secondary" onClick={toggleSourceHandler}>
                  Source
                </Button>
                <Button variant="secondary" onClick={toggleUrlHandler}>
                  Youtube Link
                </Button>
              </ButtonGroup>
            </Row>
          </Form.Group>

          {uploadWithSource}

          {submitButton}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadSong;
