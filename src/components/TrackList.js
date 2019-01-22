import React, {Fragment} from 'react';

import AudioPlayer from './AudioPlayer';
import TrackItem from './TrackItem';
import { clientId } from './../helpers/api-key';

class TrackList extends React.Component {

  state = {
    isPlaying: false,
    playingTrackUrl: '',
    playingTrackTitle: '',
    playingTrackCover: ''
  }
  
  addCurrentTrack = (currentTrackUrl, currentTrackTitle, currentTrackCover) => {
    this.setState({ playingTrackCover: currentTrackCover })
    this.setState({ playingTrackTitle: currentTrackTitle })
    this.setState({ isPlaying: true })
    this.setState({ playingTrackUrl: currentTrackUrl + clientId }, () => this.playerElemnt.play());
  }

  togglePlay = () => {
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      if (this.playerElemnt) {
        if (this.playerElemnt.paused) {
          if (this.state.isPlaying) {
            this.playerElemnt.play();
          }
        }
        else if (!this.state.isPlaying) {
          this.playerElemnt.pause();
        }
      }
    });
  }

  // updateTracks = () => {
  //   this.props.tracks
  //   .fiter(track => {

  //     return items_filters.hasAll(checked_filters) || this.props.filter.display.length === 0
  //   })
  //   .map((track, id) => {
  //     console.log(track.artwork_url)
  //   })
  // }

  render() {
    const {tracks} = this.props;

    if (tracks === false) return <div className="no-tracks">По данному запросу ничего не найдено</div>

    return (
      <Fragment>
        <AudioPlayer playingTrackCover={this.state.playingTrackCover}
                     playingTrackTitle={this.state.playingTrackTitle}
                     playingTrackUrl={this.state.playingTrackUrl}
                     playerRef={el => this.playerElemnt = el}
                     togglePlay={this.togglePlay}
        />
        <div className="tracks">
          {tracks.map((track, id) => (
            <TrackItem track={track} key={id} addCurrentTrack={this.addCurrentTrack} />
          ))}
        </div>
      </Fragment>
    )
  }
}

export default TrackList;
