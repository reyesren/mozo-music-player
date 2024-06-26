import React, { useState } from "react";
import { Link } from 'react-scroll';
import { 
  Button, 
} from "react-bootstrap";
import * as actions from "../../store/actions/index";
import store from "../../store/store";
import * as Bootstrap from "react-icons/bs";
import Playlist from "../Playlist";

const usePlaylists = (loggedInUser) => {
  const [showMyPlaylists, setShowMyPlaylists] = useState(true);
  const [showMyFavourites, setShowMyFavourites] = useState(true);
  const [showCurrentPlaylist, setShowCurrentPlaylist] = useState(true);

  const getPlaylists = () => {
    store.dispatch(actions.getPlaylists());
  };

  const getFavourites = (userId) => {
    if (typeof userId !== 'undefined') {
      if (userId.$oid !== "") {
        store.dispatch(actions.getFavourites(userId.$oid)); 
      }
    }
  };

  const toggleMyPlaylists = () => {
    setShowMyPlaylists(!showMyPlaylists);
  }

  const toggleMyFavourites = () => {
    setShowMyFavourites(!showMyFavourites);
  }

  const toggleShowMyPlaylist = () => {
    if (!showCurrentPlaylist) {
      setShowCurrentPlaylist(true);
    }
  }

  const toggleShowMyFavourites = () => {
    if (showCurrentPlaylist) {
      setShowCurrentPlaylist(false);
    }
  }

  const togglePlaylistsArrow = showMyPlaylists ? (
    <Bootstrap.BsFillCaretDownFill className="mt-1 down-arrow"></Bootstrap.BsFillCaretDownFill>
  ) : (
    <Bootstrap.BsFillCaretUpFill className="mt-1 down-arrow"></Bootstrap.BsFillCaretUpFill>
  );

  const toggleFavouritesArrow = showMyFavourites ? (
    <Bootstrap.BsFillCaretDownFill className="mt-1 down-arrow"></Bootstrap.BsFillCaretDownFill>
  ) : (
    <Bootstrap.BsFillCaretUpFill className="mt-1 down-arrow"></Bootstrap.BsFillCaretUpFill>
  );

  const viewMyPlaylists = (playlists, leftPanel) => {
    let count = 1;
    
    let userPlaylists =  playlists.filter(playlist => playlist.user == loggedInUser);

    let myPlaylists = showMyPlaylists ? (
      userPlaylists.map((playlist) => (
        <Link key={playlist._id.$oid} to={playlist._id.$oid} smooth={true} containerId="playlist-container">
          <Button 
            className="playlists-list left-align-item mt-0 pt-0 pb-0 pl-0"
            variant="outline-light"
            key={playlist._id.$oid}
            block
          >
            {(count++).toString(10) + ". " + playlist.name}
          </Button>
        </Link>
    ))) : null;

    let myPlaylistsRight = showCurrentPlaylist ? (
      userPlaylists.map((playlist) => (
        <div id={playlist._id.$oid} key={playlist._id.$oid}>
          <Playlist
            key={playlist._id.$oid}
            info={playlist}
            landing={false}
            search={false}
            sidebar={true}
          />
        </div>
    ))) : null;

    return leftPanel ? myPlaylists : myPlaylistsRight;
  }

  const viewMyFavourites = (favourites, leftPanel) => {
    let count = 1;

    let myFavourites = showMyFavourites ? (
      favourites.map((favourite) => (
        <Link key={favourite._id.$oid} to={favourite._id.$oid} smooth={true} containerId="playlist-container">
          <Button 
            className="playlists-list left-align-item mt-0 pt-0 pb-0 pl-0"
            variant="outline-light"
            key={favourite._id.$oid}
            block
          >
            {(count++).toString(10) + ". " + favourite.name}
          </Button>
        </Link>
    ))) : null;

    let myFavouritesRight = !showCurrentPlaylist ? (
      favourites.map((favourite) => (
        <div id={favourite._id.$oid} key={favourite._id.$oid}>
          <Playlist
            key={favourite._id.$oid}
            info={favourite}
            landing={false}
            search={false}
            sidebar={true}
          />
        </div>
    ))) : null;

    return leftPanel ? myFavourites : myFavouritesRight;
  }

  return {
    showMyPlaylists,
    showMyFavourites,
    showCurrentPlaylist,
    getPlaylists,
    getFavourites,
    toggleMyPlaylists,
    toggleMyFavourites,
    toggleShowMyPlaylist,
    toggleShowMyFavourites,
    togglePlaylistsArrow,
    toggleFavouritesArrow,
    viewMyPlaylists,
    viewMyFavourites
  };
};

export default usePlaylists;
