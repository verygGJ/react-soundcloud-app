import axios from 'axios';

const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
const REMOVE_IN_PLAYLIST = "REMOVE_IN_PLAYLIST";
const IS_LOGIN = "IS_LOGIN";
const FETCH_TRACKS_SUCSSES = 'FETCH_TRACKS_SUCSSES';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';


export function isLogin(bool, user, errors) {
  return {
    type: IS_LOGIN,
    payload: bool,
    user: user,
    errors: errors
  }
}


export function addToPlaylistAction(track, id, playlistName) {
  return {
    type: ADD_TO_PLAYLIST,
    payload: track,
    id: id,
    playlistName: playlistName
  }
}

export const addToPlaylist = (track, id, playlistName) => dispatch => {
  let trackPost = { "track": track, "id": id, "playlistName": playlistName }
  axios.post("/api/user/add", trackPost)
    .then(() => {
      dispatch(addToPlaylistAction(track, id, playlistName))
    })
    .catch((err) => {
      throw(err);
    })
}


export function removeInPlaylistAction(track, id, playlistName) {
  return {
    type: REMOVE_IN_PLAYLIST,
    payload: track,
    id: id,
    playlistName: playlistName
  }
}

export const removeInPlaylist = (track, id, playlistName) => dispatch => {
  let trackPost = { "track": track, "id": id, playlistName }
  axios.post("/api/user/remove", trackPost)
    .then(() => {
      dispatch(removeInPlaylistAction(track, id, playlistName))
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

export function cteateNewPlaylist(name) {
  return {
    type: CREATE_PLAYLIST,
    payload: name
  }
}