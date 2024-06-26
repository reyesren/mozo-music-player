import React from "react";
import useLogout from "./LogoutLogic";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";
import Spinner from "react-bootstrap/Spinner";

const Logout = (props) => {
  const { confirmLogoutHandler, loading } = useLogout();

  let submitButton = loading ? (
    <Spinner animation="border" role="status"></Spinner>
  ) : (
    <Button
      type="submit"
      className="btn-submit float-right logout-btn"
      onClick={() => confirmLogoutHandler(props.toggle)}
    >
      Yes, logout.
    </Button>
  );

  let modalToDisplay = (
    <Modal
      show={props.show}
      onHide={props.toggle}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
      size="md"
    >
      <Modal.Header className="signup-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="logout-title"
        >
          Logging out?
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <div className="logout-body-text">
          We're sad to see you go! Are you sure you want to logout?
        </div>
        {submitButton}
      </Modal.Body>
    </Modal>
  );

  return modalToDisplay;
};

export default Logout;
