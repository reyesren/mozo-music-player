import { useState } from "react";

const useShare = () => {
  const [shareModalShow, setShareModalShow] = useState(false);

  const toggleShareModalHandler = () => {
    setShareModalShow(!shareModalShow);
  };

  return {
    shareModalShow,
    toggleShareModalHandler,
  };
};

export default useShare;
