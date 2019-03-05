import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import axios from 'axios';

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

  componentDidMount() {
    if (this.props.isLogin) {
      axios
        .post("http://localhost:8000/api/user/tracks")
        .then(response => {
          return response;
        })
        .then(json => {
          console.log(json.data.playlist)
          if (json.data.playlist) {
            this.setState({ tracks: json.data.playlist })
          } else {
            this.setState({ tracks: [] })
            console.log("Failed load tracks")
          };
        })
        .catch(error => { console.log(`An Error Occured! ${error}`) });
    } else {
      this.setState({ tracks: this.props.myPlayListTracks })
    }
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

          let filteredArr = _.differenceWith(data, this.props.myPlayListTracks, _.isEqual);
          this.setState({
            tracks: filteredArr,
            loading: false
          });
        } else {
          this.setState({
            tracks: false,
            loading: false
          })
        }
      })
      .catch(err => { console.log("Error Reading data " + err); });
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

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    myPlayListTracks: state.playListState.myPlayListTracks,
  }
}

export default connect(mapStateToProps)(MainPage);