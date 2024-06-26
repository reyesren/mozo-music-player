import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as BoxIcons from "react-icons/bi";
import {
  Form,
  ListGroup,
} from 'react-bootstrap';
import useSearch from './SearchLogic';
import usePlaylists from "../playlists/sidebar/SidebarLogic";
import Playlist from "../playlists/Playlist";

const Search = () => {

  const loggedInUser = useSelector((state) => {
    return state.auth.user.username;
  });

  const {
    getPlaylists,
  } = usePlaylists(loggedInUser);

  useEffect(() => {
    getPlaylists();
  }, [playlists, loggedInUser]);

  const playlists = useSelector((state) => {
    return state.playlist.playlists;
  });

  const openSearch = useSelector((state) => {
    return state.search.openSearch;
  });

  const {
    searchedResults,
    setSearchedResults,
    handleOpenSearch,
    inputChangedHandler,
  } =  useSearch();

  const dynamicSearch = (e) => {
    let filteredPlaylists = playlists.filter(playlist => playlist.access === "public");
    filteredPlaylists = filteredPlaylists.filter(playlist => (e.target.value.length > 0 ? (
        playlist.name.toLowerCase().startsWith(e.target.value.toLowerCase())
      ) : false
    ));
    setSearchedResults(filteredPlaylists);
  }

  return (
    <>
      { openSearch ? (
            <Form.Group controlId="searchBar">
              <Form.Control
                type="text" 
                size="sm" 
                className="search-bar"
                placeholder="search..."
                onChange={(e) => {
                                    inputChangedHandler(e);
                                    dynamicSearch(e);
                                  }}
              >
              </Form.Control>
              <ListGroup className="search-results">
                {searchedResults.slice(0, 5).map((playlist) => (
                  <ListGroup.Item key={playlist._id.$oid} className="search-results-item">
                    <Playlist
                      key={playlist._id.$oid}
                      info={playlist}
                      landing={true}
                      search={true}
                      sidebar={false}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
        ) : (
          <BoxIcons.BiSearch className="search-icon" onClick={handleOpenSearch}></BoxIcons.BiSearch>
        )
      }
    </>
  );
};

export default Search;
