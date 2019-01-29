import { combineReducers } from 'redux';
import { PlaylistState, RegisterUsersState, LoginUsersState } from './store';

const rootReducer = combineReducers({
  PlaylistState,
  RegisterUsersState,
  LoginUsersState
})

export default rootReducer;