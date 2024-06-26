import React from "react";

const ModalCloseButton = (props) => {
  return (
    <span onClick={props.onToggle} className="close-btn">
      &times;
    </span>
  );
};

export default ModalCloseButton;
