import React from 'react';
import { connect } from "react-redux";
import { Tooltip, Icon } from 'antd';
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
    isAdded: this.props.isAdded,
    inPlaylistName: ''
  }

  showTrack = () => {
    const { track } = this.props
    this.props.addCurrentTrack(track)
  }

  addTrack = (playlistName) => {
    const { 
      isLogin, 
      addToPlaylist, 
      addToPlaylistAction, 
      track 
    } = this.props

    if (isLogin) {
      this.setState({ isAdded: true, inPlaylistName: playlistName })
      addToPlaylist(track, track.id)
    } else {
      this.setState({ isAdded: true, inPlaylistName: playlistName })
      addToPlaylistAction(track, track.id, playlistName)
    }
  }

  removeTrack = (playListPageName) => {
    const { 
      isLogin, 
      removeInPlaylist, 
      removeInPlaylistAction, 
      track 
    } = this.props
    const { inPlaylistName } = this.state
    const NameOfPlaylist = inPlaylistName || playListPageName

    if (isLogin) {
      this.setState({ isAdded: false })
      removeInPlaylist(track, track.id, NameOfPlaylist)
    } else {
      this.setState({ isAdded: false })
      removeInPlaylistAction(track, track.id, NameOfPlaylist)
    }
  }

  render() {
    const { isAdded } = this.state;
    const { track, myPlayLists, playListPage, playListPageName } = this.props;
    
    return (
      <div className={!isAdded ? 'track-item hide' : 'track-item'} >
        <div className="track-item__image">
          <img src={track.artwork_url} width="50" height="50" alt="cover" />
          
          <div className="play-button" onClick={this.showTrack}>
            <PlayButton />
          </div>

        </div>
        <div className="track-item__info">
          <div className="track-item__title">{track.title}</div>
          
          {!playListPage ? (
            !isAdded ? 
              <Tooltip trigger="click" placement="rightTop" title={(
                <ul className="added-to__list">
                  {myPlayLists.map((playlist, index) => (
                    <li key={index} onClick={() => this.addTrack(playlist.playlistName)} className="added-to__item" >{playlist.playlistName}</li>
                  ))}
                </ul>
              )}>
                <div className="add-to-palylist" >
                  <AddButton className="add-to-palylist" />
                </div>
              </Tooltip> : 
              <div className="remove-to-palylist" onClick={this.removeTrack}>
                <Icon type="close" />
              </div>
          ) : 
          <div className="remove-to-palylist" onClick={() => this.removeTrack(playListPageName)}>
            <Icon type="close" />
          </div>}
          
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