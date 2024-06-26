import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "./LoginLogic";

const Login = (props) => {
  const {
    submitHandler,
    loginForm,
    inputChangedHandler,
    errors,
    loading,
  } = useLogin();

  let submitButton = loading ? (
    <Spinner animation="border" role="status"></Spinner>
  ) : (
    <Button type="submit" className="btn-submit float-right">
      Login
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
        <Modal.Title id="contained-modal-title-vcenter">
          Login to Mozo:
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={(e) => submitHandler(e, props.toggle)}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email address"
              value={loginForm.email.value}
              onChange={(e) => inputChangedHandler(e, "email")}
            />
            {errors.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={loginForm.password.value}
              onChange={(e) => inputChangedHandler(e, "password")}
            />
            {errors.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}
          </Form.Group>
          {errors ? <div className="text-danger">{errors.error}</div> : null}
          {submitButton}
        </Form>
      </Modal.Body>
    </Modal>
  );

  return modalToDisplay;
};

export default Login;
