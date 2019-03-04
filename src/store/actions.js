const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
const REMOVE_IN_PLAYLIST = "REMOVE_IN_PLAYLIST";
const IS_LOGIN = "IS_LOGIN";
const NO_LOGIN = "NO_LOGIN";

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

export function isLogin(bool) {
  return {
    type: IS_LOGIN,
    payload: bool,
  }
}

export function noLogin(bool) {
  return {
    type: NO_LOGIN,
    payload: bool,
  }
}