const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
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

export function registrationNewUser(name, email, password) {
  return {
    type: REGISTRATION,
    name: name,
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