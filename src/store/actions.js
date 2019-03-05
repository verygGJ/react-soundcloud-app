import axios from 'axios';

const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
const REMOVE_IN_PLAYLIST = "REMOVE_IN_PLAYLIST";
const IS_LOGIN = "IS_LOGIN";
const FETCH_TRACKS_SUCSSES = 'FETCH_TRACKS_SUCSSES';


export function isLogin(bool, user, errors) {
  return {
    type: IS_LOGIN,
    payload: bool,
    user: user,
    errors: errors
  }
}


export function addToPlaylistAction(track, id) {
  return {
    type: ADD_TO_PLAYLIST,
    payload: track,
    id: id
  }
}

export const addToPlaylist = (track, id) => dispatch => {
  let trackPost = { "track": track, "id": id }
  axios.post("/api/user/add", trackPost)
    .then(() => {
      dispatch(addToPlaylistAction(track, id))
    })
    .catch((err) => {
      throw(err);
    })
}


export function removeInPlaylistAction(track, id) {
  return {
    type: REMOVE_IN_PLAYLIST,
    payload: track,
    id: id
  }
}

export const removeInPlaylist = (track, id) => dispatch => {
  let trackPost = { "track": track, "id": id }
  axios.post("/api/user/remove", trackPost)
    .then(() => {
      dispatch(removeInPlaylistAction(track, id))
    })
    .catch((err) => {
      throw(err);
    })
}


export const fetchTracksAction = (tracks) => {
  return {
    type: FETCH_TRACKS_SUCSSES,
    tracks
  }
};

export const fethcTracks = () => dispatch => {
  axios.post("/api/user/tracks")
    .then((response) => {
      dispatch(fetchTracksAction(response.data.playlist))
    })
    .catch((err) => {
      throw(err);
    })
}