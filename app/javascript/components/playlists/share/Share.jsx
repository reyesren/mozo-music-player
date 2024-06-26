import React from 'react';
import {
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";

const Share = (props) => {

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
          Share to Social Media
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <button className="share-button mb-2" data-sharer="twitter" data-title="Checkout my playlist!" data-url="https://ellisonleao.github.io/sharer.js/">Share on Twitter</button>
            </Col>

            <Col>
              <button className="share-button mb-2" data-sharer="facebook" data-url="https://ellisonleao.github.io/sharer.js/">Share on Facebook</button>
            </Col>
          </Row>

          <Row>
            <Col>
              <button className="share-button mb-2" data-sharer="linkedin" data-url="https://ellisonleao.github.io/sharer.js/">Share on Linkedin</button>
            </Col>

            <Col>
              <button className="share-button mb-2" data-sharer="whatsapp" data-title="Checkout my playlist!" data-url="https://ellisonleao.github.io/sharer.js/">Share on Whatsapp</button>
            </Col>
          </Row>

          <Row>
            <Col>
              <button className="share-button mb-2" data-sharer="pinterest" data-url="https://ellisonleao.github.io/sharer.js/">Share on Pinterest</button>
            </Col>

            <Col>
              <button className="share-button mb-2" data-sharer="tumblr" data-caption="Try Mozo Music Player today!" data-title="Checkout my playlist!" data-tags="social,share,testing" data-url="https://ellisonleao.github.io/sharer.js/">Share on Tumblr</button>
            </Col>
          </Row>

          <Row>
            <Col>
              <button className="share-button mb-2" data-sharer="reddit" data-url="https://ellisonleao.github.io/sharer.js/">Share on Reddit</button>
            </Col>

            <Col>
              <button className="share-button mb-2" data-sharer="skype" data-url="https://ellisonleao.github.io/sharer.js/" data-title="Checkout my playlist!">Share on skype</button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

    </Modal>
  );
};

export default Share;
