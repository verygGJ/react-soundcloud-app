import React, { Component, Fragment } from 'react';
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
          this.setState({
            tracks: data,
            loading: false
          });
        } else {
          this.setState({
            tracks: false,
            loading: false
          })
        }
      })
      .catch(err => {
        console.log("Error Reading data " + err);
      });
  }

  render() {
    let content = this.state.loading ? <div className="loading"><img src={loadingImage} width="25" height="25" alt="loading" /></div> : 
                <Fragment>
                  <TrackList isAdded={this.state.isAdded} tracks={this.state.tracks} />
                </Fragment>

    return (
      <div className="main-page">
        <Fragment>
          <SearchForm fetchTracks={this.fetchTracks} searchTrack={this.searchTrack} />
        </Fragment>
        {content}
      </div>
    );
  }
}

export default MainPage;
