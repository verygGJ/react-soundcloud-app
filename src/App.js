import React from 'react';

import Header from './components/Header';
import Playlist from './components/playlist/index';
import MainPage from './components/home/index';

import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <React.Fragment>
          <Header />
        </React.Fragment>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path='/playlist' component={Playlist} />
        </Switch>
      </div>
    )
  }
}

export default App;