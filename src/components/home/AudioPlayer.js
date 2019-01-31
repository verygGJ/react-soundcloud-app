import React from 'react';

import PlayButton from '../../components/ui/PlayButton';
import PrevButton from '../../components/ui/PrevButton';
import NextButton from '../../components/ui/NextButton';
import PauseButton from '../../components/ui/PauseButton';
import RepeatButton from '../../components/ui/RepeatButton';
import VolumeUp from '../ui/VolumeUp';
import VolumeDown from '../../components/ui/VolumeDown';

class AudioPlayer extends React.Component {

  repeateSingleTrack = () => {
    this.props.repeateTrackState();
  }

  autoPlayTracks = () => {
    if (!this.props.isRepeat) {
      this.props.playNextTrack();
    }  else {
      this.props.repeateTrack()
    }
  }

  handleMouseMove = (e) => {
    this.props.mouseMove(e)
  }

  handleMouseDown = (e) => {
    this.props.mouseDown(e)
  }

  handelVolumeUp = () => {
    this.props.volumeUp()
  }

  handelVolumeDown = () => {
    this.props.volumeDown()
  }

  render() {

    if (this.props.playingTrackUrl === '' && this.props.playingTrackTitle === '' && this.props.playingTrackCover === '' ) return null

    return (
      <div className="tracks-player__wrap">
        <div className="tracks-player" >
          <div className="tracks-player__image">
            <img src={this.props.playingTrackCover} width="100" height="100" alt="cover" />
          </div>
          <div className="tracks-player__info">
            <div className="tracks-player__title">{this.props.playingTrackTitle}</div>
            <div className="track-item__player">
            
              <div className="tracks-player__options">
                <div className="tracks-player__buttons">
                  <React.Fragment>
                    <PrevButton playPrevTrack={this.props.playPrevTrack} />
                  </React.Fragment>
                  <React.Fragment>
                    {!this.props.isPlaying ? 
                      <PlayButton togglePlay={this.props.togglePlay} /> :
                      <PauseButton togglePlay={this.props.togglePlay} />
                    }
                  </React.Fragment>
                  <React.Fragment>
                    <NextButton playNextTrack={this.props.playNextTrack} />
                  </React.Fragment>
                  <React.Fragment>
                    <RepeatButton 
                      repeateSingleTrack={this.repeateSingleTrack} 
                      isRepeat={this.props.isRepeat}
                    />
                  </React.Fragment>
                </div>
                <div className="tracks-player__volume">
                  <React.Fragment>
                    <VolumeDown  handelVolumeDown={this.handelVolumeDown} />
                  </React.Fragment>
                  <span className="volume-number">{this.props.currentVolume}</span>
                  <React.Fragment>
                    <VolumeUp handelVolumeUp={this.handelVolumeUp} />
                  </React.Fragment>
                </div>
              </div>

              <div id="timeline" onClick={this.handleMouseMove} ref={this.props.timelineRef}>
                <div id="handle" onMouseDown={this.handleMouseDown}  ref={this.props.handleRef}/>
              </div>

              <audio 
                className="track-item__audio" 
                ref={this.props.playerRef} 
                src={this.props.playingTrackUrl} 
                onEnded={this.autoPlayTracks} 
                controls 
              />     
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;
