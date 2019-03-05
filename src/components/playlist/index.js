import React from 'react';
import axios from 'axios';
import TrackList from "../home/TrackList";
import { connect } from "react-redux";

class Playlist extends React.Component {
  state = {
    isAdded: true,
    userPlaylist: []
  }

  componentDidMount() {
    if (this.props.isLogin) {
      axios
        .post("http://localhost:8000/api/user/tracks")
        .then(response => {
          return response;
        })
        .then(json => {
          console.log(json.data.playlist)
          if (json.data.playlist) {
            this.setState({ userPlaylist: json.data.playlist })
          } else {
            this.setState({ userPlaylist: [] })
            console.log("Failed load tracks")
          };
        })
        .catch(error => { console.log(`An Error Occured! ${error}`) });
    } else {
      this.setState({ userPlaylist: this.props.myPlayListTracks })
    }
  }

  render() {

    if (this.state.userPlaylist.length === 0) return <div className="no-tracks">There are no tracks added to your playlist.</div>

    return (
      <div className="playlist-page">
        <React.Fragment>
          <TrackList 
            isAdded={this.state.isAdded} 
            tracks={this.state.userPlaylist} 
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