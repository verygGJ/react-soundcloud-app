import React from 'react';
import PlayButton from '../../components/ui/PlayButton';
import PrevButton from '../../components/ui/PrevButton';
import NextButton from '../../components/ui/NextButton';
import PauseButton from '../../components/ui/PauseButton';
import RepeatButton from '../../components/ui/RepeatButton';
import VolumeUp from '../ui/VolumeUp';
import VolumeDown from '../../components/ui/VolumeDown';

class AudioPlayer extends React.Component {
  state = {
    downloadSrc: ''
  }

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

  handleDowmoad = (src) => {
    console.log('src', src)
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
                  <React.Fragment>
                    <a href={this.props.currentSrc} rel="noopener noreferrer" target="_blank" download className="download-button">
                      <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 -16 512.00046 512" width="512pt"><path d="m413.492188 128.910156c-17.292969-86.765625-101.648438-143.082031-188.414063-125.789062-63.460937 12.648437-113.082031 62.238281-125.769531 125.691406-61.519532 7.089844-105.648438 62.707031-98.5625 124.230469 6.523437 56.621093 54.480468 99.339843 111.476562 99.300781h80.09375c8.847656 0 16.019532-7.171875 16.019532-16.019531 0-8.847657-7.171876-16.019531-16.019532-16.019531h-80.09375c-44.238281-.261719-79.882812-36.332032-79.625-80.566407.261719-44.238281 36.332032-79.886719 80.570313-79.625 8.164062 0 15.023437-6.140625 15.921875-14.257812 8.132812-70.304688 71.722656-120.707031 142.03125-112.574219 59.109375 6.835938 105.738281 53.464844 112.574218 112.574219 1.34375 8.261719 8.5 14.3125 16.867188 14.257812 44.238281 0 80.097656 35.859375 80.097656 80.097657 0 44.234374-35.859375 80.09375-80.097656 80.09375h-80.09375c-8.847656 0-16.019531 7.171874-16.019531 16.019531 0 8.847656 7.171875 16.019531 16.019531 16.019531h80.097656c61.925782-.386719 111.816406-50.902344 111.433594-112.828125-.351562-56.394531-42.53125-103.753906-98.507812-110.605469zm0 0"/><path d="m313.019531 385.183594-40.609375 40.621094v-201.613282c0-8.847656-7.171875-16.019531-16.015625-16.019531-8.847656 0-16.019531 7.171875-16.019531 16.019531v201.613282l-40.609375-40.621094c-6.144531-6.367188-16.289063-6.542969-22.652344-.394532-6.363281 6.144532-6.539062 16.285157-.394531 22.648438.132812.136719.261719.265625.394531.394531l67.9375 67.953125c1.484375 1.480469 3.242188 2.65625 5.175781 3.460938 3.941407 1.667968 8.390626 1.667968 12.335938 0 1.933594-.804688 3.691406-1.980469 5.171875-3.460938l67.9375-67.953125c6.363281-6.144531 6.539063-16.285156.394531-22.648437-6.148437-6.363282-16.289062-6.539063-22.652344-.394532-.132812.128907-.265624.257813-.394531.394532zm0 0"/></svg>
                    </a>
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
