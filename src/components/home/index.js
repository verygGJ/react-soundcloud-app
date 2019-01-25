import React, { Component, Fragment } from 'react';
import SearchForm from './SearchForm';
import TrackList from './TrackList';

import { clientId } from '../../helpers/api-key';

class MainPage extends Component {
  state = {
    tracks: [],
    searchValue: ''
  }

  searchTrack = (e) => {
    const value = e.target.value
    this.setState({
      searchValue: value
    });
  }

  fetchTracks = (event) => {
    event.preventDefault();
    fetch(`//api.soundcloud.com/tracks/${clientId}&q="${this.state.searchValue}`)
      .then(response => response.json())
      .then((data) => {
        if (data.length > 0) {
          this.setState({
            tracks: data
          });
        } else {
          this.setState({
            tracks: false
          })
        }
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  render() {
    return (
      <div className="main-page">
        <Fragment>
          <SearchForm fetchTracks={this.fetchTracks} searchTrack={this.searchTrack} />
        </Fragment>
        <Fragment>
          <TrackList tracks={this.state.tracks} />
        </Fragment>
      </div>
    );
  }
}

export default MainPage;
