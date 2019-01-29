import React from 'react';

class PauseButton extends React.Component {
  render() {
    return (
      <button className="play-pause-btn" onClick={this.props.togglePlay} >
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="124.5px" height="124.5px" viewBox="0 0 124.5 124.5">
          <path d="M116.35,124.5c3.3,0,6-2.699,6-6V6c0-3.3-2.7-6-6-6h-36c-3.3,0-6,2.7-6,6v112.5c0,3.301,2.7,6,6,6H116.35z"/>
          <path d="M44.15,124.5c3.3,0,6-2.699,6-6V6c0-3.3-2.7-6-6-6h-36c-3.3,0-6,2.7-6,6v112.5c0,3.301,2.7,6,6,6H44.15z"/>
        </svg>
      </button>
    )
  }
}

export default PauseButton;