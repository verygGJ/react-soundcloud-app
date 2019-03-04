import { combineReducers } from 'redux';
import { mainState, playListState } from './store';

const rootReducer = combineReducers({
  mainState,
  playListState
})

export default rootReducer;