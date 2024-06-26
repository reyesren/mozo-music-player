import store from "./store/store";
import * as actions from "./store/actions/index";

const AuthCheck = () => {
  const fetchLoginStatus = () => {
    store.dispatch(actions.fetchLoginStatus());
  };

  return { fetchLoginStatus };
};

export default AuthCheck;
