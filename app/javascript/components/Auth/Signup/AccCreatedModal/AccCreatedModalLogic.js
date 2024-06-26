import React, { useState } from "react";
import * as actions from "../../../store/actions/index";
import store from "../../../store/store";
import { useSelector } from "react-redux";

const useAccCreatedModal = () => {
  const [openAccCreatedModal, setOpenAccCreatedModal] = useState(true);

  const toggleModalHandler = () => {
    setOpenAccCreatedModal(!openAccCreatedModal);
    store.dispatch(actions.authSignupResetState(setOpenAccCreatedModal));
  };

  const hasSignedUp = useSelector((state) => {
    return state.auth.hasSignedUp;
  });

  const toggleWelcomeModalHandler = () => {
    store.dispatch(actions.authSignupResetState());
  };

  return {
    openAccCreatedModal,
    toggleModalHandler,
    hasSignedUp,
    toggleWelcomeModalHandler,
    setOpenAccCreatedModal,
  };
};

export default useAccCreatedModal;
