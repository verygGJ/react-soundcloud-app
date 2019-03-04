import React from 'react';
import TrackList from "../home/TrackList";
import { connect } from "react-redux";

class Playlist extends React.Component {
  state = {
    isAdded: true,
    userPlaylist: []
  }

  render() {

    if (this.props.myPlayListTracks.length === 0) return <div className="no-tracks">В вашем плейлисте нет добавленых треков</div>

    return (
      <div className="playlist-page">
        <React.Fragment>
          <TrackList 
            isAdded={this.state.isAdded} 
            tracks={this.props.myPlayListTracks} 
          />
        </React.Fragment>
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