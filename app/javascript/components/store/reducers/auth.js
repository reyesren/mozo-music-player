import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loggedIn: false,
  user: {
    _id: {
      $oid: "",
    },
    email: "",
    favourites: [],
    firstName: "",
    lastName: "",
    username: "",
    id: {
      $oid: "",
    },
  },
  signupErrors: {},
  loginErrors: {},
  hasSignedUp: false,
};

const authSignupSuccess = (state, action) => {
  const userDetails = action.userDetails;
  const user = { ...userDetails, id: userDetails.id.$oid };
  return {
    ...state,
    loggedIn: true,
    user: user,
    hasSignedUp: true,
  };
};

const authSignupFail = (state, action) => {
  let errors = action.error;
  if (errors.email) errors = { ...errors, email: errors.email[0] };
  if (errors.username) errors = { ...errors, username: errors.username[0] };
  action.setErrors(errors);
  return {
    ...state,
    signupErrors: errors,
  };
};

const authLoginSuccess = (state, action) => {
  const userDetails = action.payload.userDetails;
  const user = { ...userDetails, _id: userDetails.id, id: userDetails.id};
  return {
    ...state,
    loggedIn: true,
    user: user,
  };
};

const authLoginFail = (state, action) => {
  let errors = { error: action.error };
  action.setErrors(errors);
  return {
    ...state,
    loginErrors: errors,
  };
};

const authCheckIfLoggedIn = (state, action) => {
  let user = action.user;
  user = { ...user, id: user._id };
  return {
    ...state,
    user: user,
    loggedIn: true,
  };
};

const authLogoutSuccess = (state, action) => {
  return {
    loggedIn: false,
    user: {},
    signupErrors: {},
    loginErrors: {},
    hasSignedUp: false,
  };
};

const authSignupResetState = (state, action) => {
  action.toggle(true);
  return {
    ...state,
    signupErrors: {},
    hasSignedUp: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return authSignupSuccess(state, action);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return authSignupFail(state, action);
    case actionTypes.AUTH_SIGNUP_RESET_STATE:
      return authSignupResetState(state, action);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return authLoginSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return authLoginFail(state, action);
    case actionTypes.AUTH_CHECK_IF_LOGGED_IN:
      return authCheckIfLoggedIn(state, action);
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return authLogoutSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
