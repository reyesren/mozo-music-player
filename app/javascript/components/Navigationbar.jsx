import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import * as Bootstrap from "react-icons/bs";
import PropTypes from "prop-types";
import Signup from "./Auth/Signup/Signup";
import Login from "./Auth/Login/Login";
import Logout from "./Auth/Logout/Logout";
import Search from "./Search/Search";

const isCurrentPage = (current, current_page) => {
  if (current === current_page) {
    return "text-light";
  } else {
    return "";
  }
};

const Navigationbar = (props) => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.loggedIn;
  });

  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const navLinks = isLoggedIn ? (
    <>
      <Nav.Link
        className={`mr-4 ${isCurrentPage(props.current_page, "Home")}`}
        href="/"
      >
        Home
      </Nav.Link>
      <Nav.Link
        className={`mr-4 ${isCurrentPage(props.current_page, "Music")}`}
        href="/music"
      >
        Music
      </Nav.Link>
      <Nav.Link
        className={`mr-4 ${isCurrentPage(props.current_page, "Playlists")}`}
        href="/playlists"
      >
        Playlists
      </Nav.Link>
      <Nav.Link
        className={`${isCurrentPage(props.current_page, "About")}`}
        href="/about"
      >
        About Us
      </Nav.Link>
    </>
  ) : null;

  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const toggleSignupHandler = () => {
    setOpenSignup(!openSignup);
  };

  const toggleLoginHandler = () => {
    setOpenLogin(!openLogin);
  };

  const toggleLogoutHandler = () => {
    setOpenLogout(!openLogout);
  };

  const signupModal = openSignup ? (
    <Signup show={openSignup} toggle={toggleSignupHandler} />
  ) : null;

  const loginModal = openLogin ? (
    <Login show={openLogin} toggle={toggleLoginHandler} />
  ) : null;

  const logoutModal = openLogout ? (
    <Logout show={openLogout} toggle={toggleLogoutHandler} />
  ) : null;

  const userInfo = isLoggedIn ? (
    <>
      <Search />
      <Bootstrap.BsFillPersonFill className="nav-user-icon"></Bootstrap.BsFillPersonFill>
      <Navbar.Text className="nav-user">{loggedInUser}</Navbar.Text>
      <Button variant="outline-light" onClick={toggleLogoutHandler}>
        Logout
      </Button>
      {logoutModal}
    </>
  ) : (
    <>
      <Nav className="mr-auto">
        <button className="borderless-button" onClick={toggleLoginHandler}>
          <Nav.Link className="text-light" href="">
            Sign in
          </Nav.Link>
        </button>
        {loginModal}
      </Nav>
      <Button variant="outline-light" onClick={toggleSignupHandler}>
        Register
      </Button>
      {signupModal}
    </>
  );

  

  return (
    <Navbar className="nav-color " variant="dark" expand="md" sticky="top">
      <Navbar.Brand href="/">MOZO</Navbar.Brand>
      <br />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ml-auto">{navLinks}</Nav>
        <Form inline>{userInfo}</Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigationbar.propTypes = {
  current_page: PropTypes.string,
};

export default Navigationbar;
