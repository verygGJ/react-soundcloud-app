import React from 'react';

class TrackItem extends React.Component {
  showTrack = () => {
    const currentTrackUrl = this.props.track.stream_url;
    const currentTrackTitle = this.props.track.title;
    const currentTrackCover = this.props.track.artwork_url;
    this.props.addCurrentTrack(currentTrackUrl, currentTrackTitle, currentTrackCover)
  }

  render() {
    const {track} = this.props;

    return (
      <div className="track-item" onClick={this.showTrack} >
        <div className="track-item__image">
          <img src={track.artwork_url} width="50" height="50" alt="cover" />
        </div>
        <div className="track-item__info">
          <div className="track-item__title">{track.title}</div>
        </div>
      </div>
    )
  }
}

export default TrackItem;
