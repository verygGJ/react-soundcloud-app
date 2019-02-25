const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
const REMOVE_IN_PLAYLIST = "REMOVE_IN_PLAYLIST";

export function addToPlaylist(track, id) {
  return {
    type: ADD_TO_PLAYLIST,
    payload: track,
    id: id
  }
}

export function removeInPlaylist(track, id) {
  return {
    type: REMOVE_IN_PLAYLIST,
    payload: track,
    id: id
  }
}