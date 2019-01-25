const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";

export function addToPlaylist(track, id) {
  return {
    type: ADD_TO_PLAYLIST,
    payload: track,
    id: id
  }
}