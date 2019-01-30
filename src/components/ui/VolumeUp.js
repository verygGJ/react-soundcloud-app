import React from 'react';

class VolumeUp extends React.Component {
  render() {
    return (
      <button className="volume-btn volume-up" onClick={this.props.handelVolumeUp} >
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="533.333px" height="533.334px" viewBox="0 0 533.333 533.334" >
          <path d="M223.002,33.291c6.237,0,10.331,6.186,10.332,17.751v431.25c0,11.565-4.091,17.752-10.331,17.752 c-3.96,0-8.786-2.494-13.976-7.684L83.333,366.666H0v-200h83.333L209.027,40.973C214.217,35.782,219.042,33.291,223.002,33.291z M533.333,300h-100v100h-66.667V300h-100v-66.667h100v-100h66.667v100h100V300z"/>
        </svg>
      </button>
    )
  }
}

export default VolumeUp;