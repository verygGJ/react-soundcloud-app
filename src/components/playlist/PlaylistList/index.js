import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import CreatePlaylist from '../CreatePlaylist/index';

class PlaylistList extends React.Component {
  render() {
    const { myPlayLists } = this.props
    return (
      <Fragment>
        <div className="playlist-list">
          {myPlayLists.map((playlist, index) => (
            <div className="playlist-list__item">
              <Link key={index} to={`/playlist/${playlist.playlistName}`}>{playlist.playlistName}</Link>
            </div>
          ))}
        </div>
        <CreatePlaylist />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayLists: state.playListState.myPlayLists
  }
}

export default connect(mapStateToProps)(PlaylistList);