import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import { validateCredentials } from "../../../validation/authValidation";
import store from "../../store/store";

const useSignup = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: {
      value: "",
    },
    lastName: {
      value: "",
    },
    email: {
      value: "",
    },
    username: {
      value: "",
    },
    password: {
      value: "",
    },
    confirmPassword: {
      value: "",
    },
    favourites: {
      value: new Array(),
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (event, input) => {
    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm.input,
        value: event.target.value,
      },
    };
    setSignupForm(updatedForm);
  };

  const submitHandler = (event, toggleSignup) => {
    event.preventDefault();
    const details = {
      firstName: signupForm.firstName.value,
      lastName: signupForm.lastName.value,
      email: signupForm.email.value,
      username: signupForm.username.value,
      password: signupForm.password.value,
      confirmPassword: signupForm.confirmPassword.value,
      favourites: signupForm.favourites.value,
    };
    const inputErrors = validateCredentials(details, false);
    if (Object.keys(inputErrors).length === 0) {
      setLoading(true);
      setErrors({});
      store.dispatch(
        actions.authSignup(
          signupForm.firstName.value,
          signupForm.lastName.value,
          signupForm.email.value,
          signupForm.username.value,
          signupForm.password.value,
          signupForm.favourites.value,
          setErrors,
          toggleSignup
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
    signupForm,
    errors,
    loading,
  };
};

export default useSignup;
