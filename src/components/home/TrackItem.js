import React from 'react';

import PlayButton from '../../components/ui/PlayButton';
import AddButton from '../../components/ui/AddButton';
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
          
          <div className="play-button" onClick={this.showTrack}>
            <PlayButton />
          </div>

        </div>
        <div className="track-item__info">
          <div className="track-item__title">{track.title}</div>
          
          
          {
            !this.state.isAdded ? 
            <div className="add-to-palylist" onClick={this.addTrack}>
              <AddButton />
            </div> :
            <div className="remove-to-palylist" onClick={this.removeTrack}>
              <AddButton />
            </div>
          }
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayListTracks: state.mainState.myPlayListTracks
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