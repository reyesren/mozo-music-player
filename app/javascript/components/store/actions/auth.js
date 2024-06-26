import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authSignupSuccess = (userDetails) => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    userDetails,
  };
};

export const authSignupFail = (error, setErrors) => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    error: error,
    setErrors,
  };
};

export const authLoginSuccess = (userDetails) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    payload: {
      userDetails: userDetails,
    },
  };
};

export const authLoginFail = (error, setErrors) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    error: error,
    setErrors,
  };
};

export const authSignupResetState = (toggleModal) => {
  return {
    type: actionTypes.AUTH_SIGNUP_RESET_STATE,
    toggle: toggleModal,
  };
};

export const authCheckIfLoggedIn = (user) => {
  return {
    type: actionTypes.AUTH_CHECK_IF_LOGGED_IN,
    user,
  };
};

export const authLogoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS,
  };
};

export const authSignup = (
  firstName,
  lastName,
  email,
  username,
  password,
  favourites,
  setErrors,
  toggleSignup
) => async (dispatch) => {
  try {
    const csrf = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");
    const url = "/api/users";
    const authData = {
      user: { firstName, lastName, email, username, password, favourites },
    };
    const response = await axios({
      method: "POST",
      url: url,
      data: authData,
      headers: {
        "X-CSRF-Token": csrf,
      },
    });
    dispatch(authSignupSuccess(response.data));
    toggleSignup();
  } catch (err) {
    dispatch(authSignupFail(err.response.data, setErrors));
  }
};

export const authLogin = (email, password, setErrors, toggleLogin) => async (
  dispatch
) => {
  const csrf = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  const authData = {
    user: { email, password },
  };

  const response = await axios({
    method: "POST",
    url: "/api/login",
    data: authData,
    headers: {
      "X-CSRF-Token": csrf,
    },
  });
  if (!response.data.error) {
    dispatch(authLoginSuccess(response.data.user));
    toggleLogin();
  } else {
    dispatch(authLoginFail(response.data.error, setErrors));
  }
};

export const fetchLoginStatus = () => async (dispatch) => {
  const response = await axios.get("/api/logged_in");
  if (response.data) dispatch(authCheckIfLoggedIn(response.data));
};

export const authLogout = (toggleLogout) => async (dispatch) => {
  const response = await axios.delete("/api/logout");
  if (response.data) {
    dispatch(authLogoutSuccess());
    toggleLogout();
  }
};
