import React from 'react';

import { addToPlaylist, removeInPlaylist } from '../../store/actions';
import { connect } from "react-redux";

class TrackItem extends React.Component {
  state = {
    isAdded: this.props.isAdded
  }

  showTrack = () => {
    const tracksInfo = this.props.track;
    this.props.addCurrentTrack(tracksInfo)
  }

  addTrack = () => {
    this.setState({ isAdded: true })
    this.props.addToPlaylist(this.props.track, this.props.track.id);
  }

  removeTrack = () => {
    this.setState({ isAdded: false })
    this.props.removeInPlaylist(this.props.track, this.props.track.id);
  }

  render() {
    const { track } = this.props;

    return (
      <div className={!this.state.isAdded ? 'track-item hide' : 'track-item'} >
        <div className="track-item__image">
          <img src={track.artwork_url} width="50" height="50" alt="cover" />
        </div>
        <div className="track-item__info">
          <div className="track-item__title">{track.title}</div>
          <button className="add-to-palylist" onClick={this.showTrack}>PLAY</button>
          
          {
            !this.state.isAdded ? <button className="add-to-palylist" onClick={this.addTrack}>ADD</button> :
                                  <button className="add-to-palylist" onClick={this.removeTrack}>REMOVE</button>
          }
          
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
    },
    removeInPlaylist: (track, id) => {
      dispatch(removeInPlaylist(track, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);