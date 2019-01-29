import React from 'react';

import PlayButton from '../../components/ui/PlayButton';
import PrevButton from '../../components/ui/PrevButton';
import NextButton from '../../components/ui/NextButton';
import PauseButton from '../../components/ui/PauseButton';

class AudioPlayer extends React.Component {
  render() {

    if (this.props.playingTrackUrl === '' && this.props.playingTrackTitle === '' && this.props.playingTrackCover === '' ) return null

    return (
      <div className="tracks-player" >
        <div className="tracks-player__image">
          <img src={this.props.playingTrackCover} width="100" height="100" alt="cover" />
        </div>
        <div className="tracks-player__info">
          <div className="tracks-player__title">{this.props.playingTrackTitle}</div>
          <div className="track-item__player">
            <audio ref={this.props.playerRef} className="track-item__audio" src={this.props.playingTrackUrl} onEnded={this.props.playNextTrack} controls />    
            <React.Fragment>
              {
                this.props.isPlaying ? 
                <PlayButton togglePlay={this.props.togglePlay} /> :
                <PauseButton togglePlay={this.props.togglePlay} />
              }
            </React.Fragment>
            <React.Fragment>
              <PrevButton playPrevTrack={this.props.playPrevTrack} />
            </React.Fragment>
            <React.Fragment>
              <NextButton playNextTrack={this.props.playNextTrack} />
            </React.Fragment>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;
