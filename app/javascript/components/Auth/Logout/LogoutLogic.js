import React, { useState } from "react";
import * as actions from "../../store/actions/index";
import store from "../../store/store";
import { useHistory } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const confirmLogoutHandler = (toggleLogout) => {
    setLoading(true);
    store.dispatch(actions.authLogout(toggleLogout));
    setLoading(false);
    history.push("/");
  };

  return {
    confirmLogoutHandler,
    loading,
  };
};

export default useLogout;
