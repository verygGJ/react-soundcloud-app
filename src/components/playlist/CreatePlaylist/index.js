import React from 'react';
import { connect } from "react-redux";
import { cteateNewPlaylist } from '../../../store/actions';

class CreatePlaylist extends React.Component {
  state = {
    playlistName: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreatePlaylist = (event) => {
    const { playlistName } = this.state
    event.preventDefault()
    this.props.cteateNewPlaylist(playlistName)
    this.setState({ playlistName: '' });
  };

  render() {
    const { playlistName } = this.state
    return (
      <form className="main-form" id="create-playlist" onSubmit={this.handleCreatePlaylist}>
        <div className="form-block">
          <label>Введите название плейлиста</label>
          <input name="playlistName"
            onChange={this.handleChange}
            type="text" 
            className="main-input"
            value={playlistName}
          />
        </div>
        <button className="submit-button" type="submit">Сохранить</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    myPlayListTracks: state.playListState.myPlayListTracks,
    isLogin: state.mainState.isLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cteateNewPlaylist: (name) => {
      dispatch(cteateNewPlaylist(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);