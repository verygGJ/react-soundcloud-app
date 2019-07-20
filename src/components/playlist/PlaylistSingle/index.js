import React from 'react';
import { connect } from "react-redux";
import TrackList from "../../home/TrackList";

class PlaylistSingle extends React.Component {
  state = {
    playListPage: true,    
    isAdded: true,
  }

  render() {
    const { playListPage } = this.state
    const { myPlayLists, match } = this.props
    const checkPlaylist = myPlayLists.filter(list => (
      list.playlistName === match.params.name
    ))
    const currentPlaylist = checkPlaylist[0].tracks

    if (!currentPlaylist || currentPlaylist.length === 0) return <div className="no-tracks">There are no tracks added to your playlist.</div>

    return (
      <React.Fragment>
        <div className="playlist-page">
          <TrackList 
            isAdded={this.state.isAdded} 
            tracks={currentPlaylist} 
            playListPage={playListPage}
          />
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayLists: state.playListState.myPlayLists,
    isLogin: state.mainState.isLogin
  }
}

export default connect(mapStateToProps)(PlaylistSingle);