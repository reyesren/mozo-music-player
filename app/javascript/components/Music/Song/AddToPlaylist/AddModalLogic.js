import { useState } from "react";
import * as actions from "../../../store/actions/index";

const useAddModal = () => {
  const [addModalShow, setAddModalShow] = useState(false);

  const toggleAddModalHandler = () => {
    setAddModalShow(!addModalShow);
  };

  return { 
    addModalShow,
    toggleAddModalHandler,
  };
};

export default useAddModal;
