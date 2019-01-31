import React, {Fragment} from 'react';

import AudioPlayer from './AudioPlayer';
import TrackItem from './TrackItem';
import { clientId } from '../../helpers/api-key';

class TrackList extends React.Component {
  state = {
    playingTrackUrl: '',
    playingTrackTitle: '',
    playingTrackCover: '', 
    isPlaying: false,
    isRepeat: false,
    playingTracks: this.props.tracks,
    selectedIndex: 0,
    currentVolume: '1.0'
  }

  addCurrentTrack = (tracksInfo) => {
    let currentTrack;
    this.props.tracks.forEach((track) => {
      if (track === tracksInfo) {
        currentTrack = track;
        return currentTrack
      }
      return currentTrack
    })
    
    let currentTrackIndex = this.props.tracks.indexOf(currentTrack)
    
    this.setState({ 
      selectedIndex: currentTrackIndex,
      playingTracks: this.props.tracks,
      playingTrackCover: currentTrack.artwork_url,
      playingTrackTitle: currentTrack.title,
      isPlaying: true
    })
    this.setState({ playingTrackUrl: currentTrack.stream_url + clientId }, () => this.playerElemnt.play());
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

  playNextTrack = () => {
    let lengTracks = this.props.tracks.length
    let newIndex;
    if ((this.state.selectedIndex + 1) === lengTracks) {
      newIndex = 0
    } else {
      newIndex = this.state.selectedIndex + 1;
    }

    this.setState({ 
      playingTracks: this.state.playingTracks, 
      playingTrackCover: this.state.playingTracks[newIndex].artwork_url,
      playingTrackTitle: this.state.playingTracks[newIndex].title
    })
    this.setState({ playingTrackUrl: this.state.playingTracks[newIndex].stream_url + clientId }, () => this.playerElemnt.play());
    this.setState({ selectedIndex: newIndex })
  }

  playPrevTrack = () => {
    let lengTracks = this.props.tracks.length
    
    let newIndex;
    if ((this.state.selectedIndex - 1) < 0) {
      newIndex = lengTracks - 1
    } else {
      newIndex = this.state.selectedIndex - 1;
    }

    this.setState({ 
      playingTracks: this.state.playingTracks, 
      playingTrackCover: this.state.playingTracks[newIndex].artwork_url,
      playingTrackTitle: this.state.playingTracks[newIndex].title
    })
    this.setState({ playingTrackUrl: this.state.playingTracks[newIndex].stream_url + clientId }, () => this.playerElemnt.play());
    this.setState({ selectedIndex: newIndex })
  }

  repeateTrackState = () => {
    this.setState({ isRepeat: !this.state.isRepeat })
  }

  repeateTrack = () => {
    if (this.state.isRepeat) {
      this.playerElemnt.play()
    }
  }


  render() {
    const {tracks} = this.props;

    if (tracks === false) return <div className="no-tracks">По данному запросу ничего не найдено</div>

    return (
      <Fragment>
        <AudioPlayer 
          playingTrackCover={this.state.playingTrackCover}
          playingTrackTitle={this.state.playingTrackTitle}
          playingTrackUrl={this.state.playingTrackUrl}
          playerRef={el => this.playerElemnt = el}
          togglePlay={this.togglePlay}
          playNextTrack={this.playNextTrack}
          playPrevTrack={this.playPrevTrack}
          isPlaying={this.state.isPlaying}
          repeateTrackState={this.repeateTrackState}
          repeateTrack={this.repeateTrack}
          isRepeat={this.state.isRepeat}
          mouseMove={this.mouseMove}
          mouseDown={this.mouseDown}
          timelineRef={(timeline) => { this.timeline = timeline }}
          handleRef={(handle) => { this.handle = handle }}
          volumeUp={this.volumeUp}
          volumeDown={this.volumeDown}
          currentVolume={this.state.currentVolume}
        />
        <div className="tracks">
          {tracks.map((track, id) => (
            <TrackItem 
              isAdded={this.props.isAdded} 
              track={track} 
              key={id} 
              addCurrentTrack={this.addCurrentTrack} 
            />
          ))}
        </div>
      </Fragment>
    )
  }

  componentDidUpdate() {
    if (this.playerElemnt) {
      this.playerElemnt.addEventListener("timeupdate", () => {
        let ratio = this.playerElemnt ? this.playerElemnt.currentTime / this.playerElemnt.duration : 0
        let position = this.playerElemnt ? (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft : 0
        this.positionHandle(position);
      });
    }
  };

  mouseMove = (e) => {
    this.positionHandle(e.pageX);
    this.playerElemnt.currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.playerElemnt.duration;
  };

  mouseUp = (e) => {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  };

  mouseDown = (e) => {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  positionHandle = (position) => {
    if (this.playerElemnt) {
      let handleLeft = position - this.timeline.offsetLeft;
      if (handleLeft >= 0) {
        this.handle.style.width = handleLeft + "px";
      }
      if (handleLeft < 0) {
        this.handle.style.width = "0px";
      }
    }
  }

  volumeUp = () => {
    if ( this.playerElemnt.volume < 1.0 && this.playerElemnt.volume !== 1.0 ) {
      this.playerElemnt.volume = this.playerElemnt.volume + 0.1
    }
    this.setState({ currentVolume: this.playerElemnt.volume.toFixed(1) })
  }

  volumeDown = () => {
    if ( this.playerElemnt.volume >= 0.1 ) {
      this.playerElemnt.volume  = this.playerElemnt.volume  - 0.1
    }
    this.setState({ currentVolume: this.playerElemnt.volume.toFixed(1) })
  }

}

export default TrackList;