import React, { useState } from "react";
import Playlist from "../playlists/Playlist";

const useLanding = (loggedInUser) => {
  const [playlistOrder, setPlaylistOrder] = useState("mp");

  const handleMostPopular = () => {
    setPlaylistOrder("mp");
  };

  const handleMostFavourited = () => {
    setPlaylistOrder("mf");
  };
  
  const handleMostRecent = () => {
    setPlaylistOrder("mr");
  };

  const handleOldest = () => {
    setPlaylistOrder("o");
  };

  const viewPlaylists = (inPlaylists, order) => {

    let playlists = inPlaylists.filter(playlist => playlist.access !=="private").slice(0, 50);

    switch (order) {
      case "mp":
        (
          playlists.sort((a, b) => {
            if (a.num_views > b.num_views) return -1;
            if (a.num_views < b.num_views) return 1;
            return 0;
          })
        );
        break;
      case "mf":
        (
          playlists.sort((a, b) => {
            if (a.favourited_by.length > b.favourited_by.length) return -1;
            if (a.favourited_by.length < b.favourited_by.length) return 1;
            return 0;
          })
        );
        break;
      case "mr":
        (
          playlists.sort((a, b) => {
            let keyA = new Date(a.updated_at);
            let keyB = new Date(b.updated_at);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          })
        );
        break;
      case "o":
        (
          playlists.sort((a, b) => {
            let keyA = new Date(a.created_at);
            let keyB = new Date(b.created_at);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          })
        );
        break;
    };

    let userPlaylists = (
      playlists.map((playlist) => (
        <div id={playlist._id.$oid} key={playlist._id.$oid}>
          <Playlist
            key={playlist._id.$oid}
            info={playlist}
            landing={true}
            search={false}
            sidebar={false}
          />
        </div>
      )));

    return userPlaylists;
  }

  return {
    playlistOrder,
    setPlaylistOrder,
    handleMostPopular,
    handleMostFavourited,
    handleMostRecent,
    handleOldest,
    viewPlaylists,
  };
};

export default useLanding;
