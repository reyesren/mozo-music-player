import { useState } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import { validateUpload } from "../../../validation/createUploadValidation";
import store from "../../store/store";

const useUpload = () => {
  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [sourceOrUrl, setSourceOrUrl] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    name: {
      value: "",
    },
    artist: {
      value: "",
    },
    length: {
      value: "",
    },
    user: {
      value: loggedInUser,
    },
    source: {
      value: "",
    },
    url: {
      value: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (event, input) => {
    let fieldValue =
      input === "source" ? event.target.files[0] : event.target.value;
    const updatedForm = {
      ...uploadForm,
      [input]: {
        ...uploadForm.input,
        value: fieldValue,
      },
    };
    setUploadForm(updatedForm);
  };

  const submitHandler = (event, toggleModal) => {
    event.preventDefault();
    let details = {
      name: uploadForm.name.value,
      artist: uploadForm.artist.value,
      // length: uploadForm.length.value,
      length: 180,
      user: uploadForm.user.value,
      source: uploadForm.source.value,
      // url: uploadForm.url.value,
    };
    const inputErrors = validateUpload(details, false);

    if (Object.keys(inputErrors).length === 0) {
      setLoading(true);
      setErrors({});
      store.dispatch(actions.addSong(details));
      toggleModal();
      setLoading(false);

      //   store.dispatch(actions.getUploads())
    } else {
      setErrors(inputErrors);
    }
  };

  const toggleUploadModalHandler = () => {
    setUploadModalShow(!uploadModalShow);
  };

  const toggleSourceHandler = () => {
    if (!sourceOrUrl) {
      setSourceOrUrl(true);
      // reset the inputs for the url or source
      const updatedForm = {
        ...uploadForm,
        source: {
          value: "",
        },
        url: {
          value: "",
        },
      };
      setUploadForm(updatedForm);
      setErrors({});
    }
  };

  const toggleUrlHandler = () => {
    if (sourceOrUrl) {
      setSourceOrUrl(false);
      // reset the inputs for the url or source
      const updatedForm = {
        ...uploadForm,
        source: {
          value: "",
        },
        url: {
          value: "",
        },
      };
      setUploadForm(updatedForm);
      setErrors({});
    }
  };

  return {
    uploadModalShow,
    sourceOrUrl,
    toggleUploadModalHandler,
    toggleSourceHandler,
    toggleUrlHandler,
    submitHandler,
    inputChangedHandler,
    uploadForm,
    errors,
    loading,
  };
};

export default useUpload;
