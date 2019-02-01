const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
const REMOVE_IN_PLAYLIST = "REMOVE_IN_PLAYLIST";
const REGISTRATION = "REGISTRATION";
const IS_LOGIN = "IS_LOGIN";
const IS_LOGOUT = "IS_LOGOUT";

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

export function registrationNewUser(first_name, last_name, email, password) {
  return {
    type: REGISTRATION,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    id: new Date().valueOf() + Math.random().toFixed(16).substring(2)
  }
}

export function actionLoginUser(loginUser, isLogin) {
  return {
    type: IS_LOGIN,
    user: loginUser,
    isLogin: isLogin,
  }
}

export function actionlogoutUser(loginUser, isLogin) {
  return {
    type: IS_LOGOUT,
    user: loginUser,
    isLogin: isLogin
  }
}