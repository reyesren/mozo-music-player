import store from '../store/store';
import * as actions from "../store/actions/index";

const usePlaylist = (user, playlist) => {

  const getPlaylistUsername = () => {
    return playlist ? playlist.user : null;
  }

  const checkIsFavourited = () => {
    let isFavourited = false;

    if ((typeof user !== 'undefined') 
        && (typeof playlist !== 'undefined')
        && user !== null
        && playlist !== null
        ) {
      isFavourited = (user.favourites.includes(playlist._id.$oid) || playlist.favourited_by.includes(user._id.$oid));
    }

    return isFavourited;
  };

  const handlePlaylistClick = async () => {
    if (playlist.user !== user.username) {
      let data = {"num_views": playlist.num_views + 1}
      await store.dispatch(
        actions.updatePlaylist(
          playlist._id.$oid,
          data,
        )
      );
    }

    store.dispatch(actions.getCurrentPlaylist(playlist));
  };

  // TODO need to handle functionality for these 4 

  const handlePlayAll = () => {
    console.log("PLAY ALL");
  };

  const handleShuffle = () => {
    console.log("SHUFFLE");
  };


  const handleAddToFavourites = () => {
    const updateData = {
      "favourited_by": [...playlist.favourited_by, user._id.$oid],
    }

    const userData = {
      "favourites": [...user.favourites, playlist._id.$oid],
    }

    store.dispatch(actions.addToFavourites(user._id.$oid, userData, playlist._id.$oid, updateData));
  };

  const handleRemoveFromFavourites = async () => {
    const newFavourited = playlist.favourited_by.filter(playlistUser => playlistUser !== user._id.$oid);

    const newFavourites = user.favourites.filter(playlistFavourited => playlistFavourited !== playlist._id.$oid);

    const updateData = {
      "favourited_by": newFavourited,
    }

    const userData = {
      "favourites": newFavourites,
    }

    await store.dispatch(actions.removeFromFavourites(user._id.$oid, userData, playlist._id.$oid, updateData));
  };

  const deletePlaylist = async () => {
    if (checkIsFavourited()) {
      await handleRemoveFromFavourites();
      await store.dispatch(actions.deletePlaylist(playlist._id.$oid));
    } else {
      await store.dispatch(actions.deletePlaylist(playlist._id.$oid));
    }
  };

  return {
    getPlaylistUsername,
    checkIsFavourited,
    handlePlaylistClick,
    deletePlaylist,
    handlePlayAll,
    handleShuffle,
    handleAddToFavourites,
    handleRemoveFromFavourites,
  };
}

export default usePlaylist;
