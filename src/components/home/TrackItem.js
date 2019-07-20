import React from 'react';
import { connect } from "react-redux";

import PlayButton from '../../components/ui/PlayButton';
import AddButton from '../../components/ui/AddButton';
import { 
  addToPlaylist, 
  removeInPlaylist,
  addToPlaylistAction,
  removeInPlaylistAction
} from '../../store/actions';


class TrackItem extends React.Component {
  state = {
    isAdded: this.props.isAdded
  }

  showTrack = () => {
    const tracksInfo = this.props.track;
    this.props.addCurrentTrack(tracksInfo)
  }

  addTrack = (playlistName) => {
    const { isLogin, track } = this.props
    if (isLogin) {
      this.setState({ isAdded: true })
      this.props.addToPlaylist(track, track.id)
    } else {
      this.setState({ isAdded: true })
      this.props.addToPlaylistAction(track, track.id, playlistName)
    }
  }

  removeTrack = () => {
    if (this.props.isLogin) {
      this.setState({ isAdded: false })
      this.props.removeInPlaylist(this.props.track, this.props.track.id)
    } else {
      this.setState({ isAdded: false })
      this.props.removeInPlaylistAction(this.props.track, this.props.track.id)
    }
  }

  render() {
    const { track, playListPage } = this.props;

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
          
          {!this.state.isAdded ? 
            <div className="add-to-palylist" onClick={this.addTrack}>
              <AddButton />
            </div> :
            <div className="remove-to-palylist" onClick={this.removeTrack}>
              <AddButton />
            </div>
          }
          {!playListPage ? <ul className="added-to__list">
              {this.props.myPlayLists.map((playlist, index) => (
                <li key={index} onClick={() => this.addTrack(playlist.playlistName)} className="added-to__item" >{playlist.playlistName}</li>
              ))}
            </ul> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayListTracks: state.playListState.myPlayListTracks,
    myPlayLists: state.playListState.myPlayLists,
    isLogin: state.mainState.isLogin,
    user: state.mainState.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: (track, id) => {
      dispatch(addToPlaylist(track, id))
    },
    removeInPlaylist: (track, id) => {
      dispatch(removeInPlaylist(track, id))
    },
    addToPlaylistAction: (track, id, playlistName) => {
      dispatch(addToPlaylistAction(track, id, playlistName))
    },
    removeInPlaylistAction: (track, id, playlistName) => {
      dispatch(removeInPlaylistAction(track, id, playlistName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);