import React from 'react';

import { addToPlaylist } from '../../store/actions';
import { connect } from "react-redux";

class TrackItem extends React.Component {
  showTrack = () => {
    const tracksInfo = this.props.track;
    this.props.addCurrentTrack(tracksInfo)
  }

  addTrack = () => {
    this.props.addToPlaylist(this.props.track, this.props.track.id);
  }

  render() {
    const { track } = this.props;

    return (
      <div className="track-item">
        <div className="track-item__image">
          <img src={track.artwork_url} width="50" height="50" alt="cover" />
        </div>
        <div className="track-item__info">
          <div className="track-item__title">{track.title}</div>
          <button className="add-to-palylist" onClick={this.showTrack}>PLAY</button>
          <button className="add-to-palylist" onClick={this.addTrack}>ADD</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayListTracks: state.PlaylistState.myPlayListTracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (track, id) => {
      dispatch(addToPlaylist(track, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);