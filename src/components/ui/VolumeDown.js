import React from 'react';

class VolumeDown extends React.Component {
  render() {
    return (
      <button className="volume-btn volume-down" onClick={this.props.handelVolumeDown} >
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" >
          <path d="M214.082,31.959c5.988,0,9.918,5.939,9.919,17.041v414c0,11.103-3.928,17.041-9.918,17.041 c-3.802,0-8.434-2.394-13.417-7.376L80,352H0V160h80L200.666,39.334C205.649,34.351,210.28,31.959,214.082,31.959z M256,224h256v64 H256V224z"/>
        </svg>
      </button>
    )
  }
}

export default VolumeDown;