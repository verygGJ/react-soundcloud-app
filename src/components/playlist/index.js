import React from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import PlaylistList from './PlaylistList/index';
import PlaylistSingle from './PlaylistSingle/index';

class Playlist extends React.Component {
  state = {
    isAdded: true,
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/playlist"
            render={props => (
              <PlaylistList {...props} />
            )}
          />
          <Route exact path="/playlist/:name"
            render={props => (
              <PlaylistSingle {...props} />
            )}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayListTracks: state.playListState.myPlayListTracks,
    isLogin: state.mainState.isLogin
  }
}

export default connect(mapStateToProps)(Playlist);