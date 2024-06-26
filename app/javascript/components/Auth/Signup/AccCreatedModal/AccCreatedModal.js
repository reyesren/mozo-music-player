import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useAccCreatedModal from "./AccCreatedModalLogic";
import ModalCloseButton from "../../../UI/ModalCloseButton/ModalCloseButton";

const AccCreatedModal = (props) => {
  const {
    openAccCreatedModal,
    toggleModalHandler,
    hasSignedUp,
  } = useAccCreatedModal();

  let signupWelcomeModal = hasSignedUp ? (
    <Modal
      show={openAccCreatedModal}
      onHide={toggleModalHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Mozo!
        </Modal.Title>
        <ModalCloseButton
          onToggle={props.toggle}
          className="welcome-modal-close-btn"
        ></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <p className="welcome-modal-description">
          We hope you enjoy your time using the app!
        </p>
        <p className="welcome-modal-description welcome-modal-description-2">
          Navigate to the feedback form section of the app if you have any ideas
          on how to improve the app.
        </p>
        <p className="welcome-modal-signoff">- the Mozo Team</p>
      </Modal.Body>
      <Button
        className="btn-enter-mozo float-right"
        onClick={toggleModalHandler}
      >
        Enter the Mozo App
      </Button>
    </Modal>
  ) : null;

  return signupWelcomeModal;
};

export default AccCreatedModal;
