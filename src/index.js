import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { BrowserRouter, withRouter } from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { playListState } from './store/store';


const persistedState = localStorage.getItem('reduxState') ? 
      JSON.parse(localStorage.getItem('reduxState')) : {}
      
const store = createStore(rootReducer, persistedState);

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState(playListState)))
})

const AppContainer = withRouter(props => <App {...props} />);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
