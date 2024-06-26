import React, { useState } from 'react';
import store from '../store/store';
import * as actions from '../store/actions/index';

const useSearch = () => {
  const handleOpenSearch = () => {
    store.dispatch(actions.setOpenSearch(true));
  };
  
  const handleCloseSearch = () => {
    store.dispatch(actions.setOpenSearch(false))
  }

  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputChangedHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    handleOpenSearch,
    handleCloseSearch,
    searchedResults,
    setSearchedResults,
    searchTerm,
    setSearchTerm,
    inputChangedHandler,
  }
}

export default useSearch;
