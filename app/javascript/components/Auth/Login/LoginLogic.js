import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import { validateCredentials } from "../../../validation/authValidation";
// import { useDispatch, useSelector, Provider } from "react-redux";
import store from "../../store/store";

const useLogin = () => {
  const [loginForm, setLoginForm] = useState({
    email: {
      value: "",
    },
    password: {
      value: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (event, input) => {
    const updatedForm = {
      ...loginForm,
      [input]: {
        ...loginForm.input,
        value: event.target.value,
      },
    };
    setLoginForm(updatedForm);
  };

  const submitHandler = (event, toggleLogin) => {
    event.preventDefault();
    const details = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };
    const inputErrors = validateCredentials(details, true);
    if (Object.keys(inputErrors).length === 0) {
      setLoading(true);
      setErrors({});
      store.dispatch(
        actions.authLogin(
          loginForm.email.value,
          loginForm.password.value,
          setErrors,
          toggleLogin
        )
      );
      setLoading(false);
    } else {
      setErrors(inputErrors);
    }
  };

  return {
    submitHandler,
    inputChangedHandler,
    loginForm,
    errors,
    loading,
  };
};

export default useLogin;
