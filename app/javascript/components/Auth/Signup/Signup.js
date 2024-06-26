import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import useSignup from "./SignupLogic";

const Signup = (props) => {
  const {
    submitHandler,
    signupForm,
    inputChangedHandler,
    errors,
    loading,
  } = useSignup();

  let submitButton = loading ? (
    <Spinner animation="border" role="status"></Spinner>
  ) : (
    <Button type="submit" className="btn-submit float-right">
      Create Account
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
          Sign Up To Mozo:
        </Modal.Title>
        <ModalCloseButton onToggle={props.toggle}></ModalCloseButton>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={(e) => submitHandler(e, props.toggle)}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  value={signupForm.firstName.value}
                  onChange={(e) => inputChangedHandler(e, "firstName")}
                />
                {errors.firstName ? (
                  <div className="text-danger">{errors.firstName}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  value={signupForm.lastName.value}
                  onChange={(e) => inputChangedHandler(e, "lastName")}
                />
                {errors.lastName ? (
                  <div className="text-danger">{errors.lastName}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email address"
                  value={signupForm.email.value}
                  onChange={(e) => inputChangedHandler(e, "email")}
                />
                {errors.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  value={signupForm.username.value}
                  onChange={(e) => inputChangedHandler(e, "username")}
                />
                {errors.username ? (
                  <div className="text-danger">{errors.username}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Password"
                  type="password"
                  value={signupForm.password.value}
                  onChange={(e) => inputChangedHandler(e, "password")}
                />
                {errors.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder="Confirm Passsword"
                  type="password"
                  value={signupForm.confirmPassword.value}
                  onChange={(e) => inputChangedHandler(e, "confirmPassword")}
                />
                {errors.confirmPassword ? (
                  <div className="text-danger">{errors.confirmPassword}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          {submitButton}
        </Form>
      </Modal.Body>
    </Modal>
  );

  return modalToDisplay;
};

export default Signup;
