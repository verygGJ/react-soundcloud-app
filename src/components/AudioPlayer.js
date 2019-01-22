import React from 'react';

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
            <audio ref={this.props.playerRef} className="track-item__audio" src={this.props.playingTrackUrl} controls />
            <button className="play-pause-btn" onClick={this.props.togglePlay} >Play</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;
