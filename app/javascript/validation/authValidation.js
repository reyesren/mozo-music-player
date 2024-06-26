const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateCredentials = (userDetails, isLogin) => {
  let errors = {};
  if (!isLogin) {
    if (!userDetails.firstName) {
      errors = { ...errors, firstName: "Your first name can't be empty!" };
    }
    if (!userDetails.lastName) {
      errors = { ...errors, lastName: "Your last name can't be empty!" };
    }
    if (!userDetails.username) {
      errors = { ...errors, username: "Your username can't be empty!" };
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      errors = { ...errors, confirmPassword: "Your passwords don't match!" };
    }

    if (userDetails.password.length < 6) {
      errors = {
        ...errors,
        password: "Your password must be at least 6 characters long.",
      };
    }

    if (!userDetails.confirmPassword) {
      errors = {
        ...errors,
        confirmPassword: "Please confirm your password.",
      };
    }
  }

  if (!userDetails.email || !validateEmail(userDetails.email)) {
    errors = { ...errors, email: "Please provide a valid email." };
  }

  if (!userDetails.password) {
    errors = {
      ...errors,
      password: "Please provide your password.",
    };
  }

  return errors;
};
