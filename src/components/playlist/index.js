import React from 'react';
import { connect } from "react-redux";

import TrackList from "../home/TrackList";

class Playlist extends React.Component {
  state = {
    isAdded: true,
  }

  render() {
    if (this.props.myPlayListTracks.length === 0) return <div className="no-tracks">There are no tracks added to your playlist.</div>

    return (
      <div className="playlist-page">
        <TrackList 
          isAdded={this.state.isAdded} 
          tracks={this.props.myPlayListTracks} 
        />
      </div>
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