import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import SearchForm from './SearchForm';
import TrackList from './TrackList';
import loadingImage from '../ui/loading.gif';
import { clientId } from '../../helpers/api-key';


class MainPage extends Component {
  state = {
    tracks: [],
    searchValue: '',
    isAdded: false,
    hideElement: false,
    loading: false
  }

  searchTrack = (e) => {
    const value = e.target.value
    this.setState({ searchValue: value })
  }

  fetchTracks = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    fetch(`//api.soundcloud.com/tracks/${clientId}&q="${this.state.searchValue}`)
      .then(response => response.json())
      .then((data) => {
        if (data.length > 0) {
          let filteredTracks = _.differenceBy(data, this.props.myPlayListTracks, 'id');
          this.setState({ tracks: filteredTracks, loading: false });
        } else {
          this.setState({ tracks: false, loading: false })
        }
      })
      .catch(err => { console.log("Error Reading data " + err); });
  }

  render() {
    return (
      <div className="main-page">
        <Fragment>
          <SearchForm fetchTracks={this.fetchTracks} searchTrack={this.searchTrack} />
        </Fragment>
        {
          this.state.loading ?
          <div className="loading">
            <img src={loadingImage} width="25" height="25" alt="loading" />
          </div> : 
          <Fragment>
            <TrackList isAdded={this.state.isAdded} tracks={this.state.tracks} />
          </Fragment>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    myPlayListTracks: state.playListState.myPlayListTracks,
  }
}

export default connect(mapStateToProps)(MainPage);