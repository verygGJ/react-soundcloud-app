import React from 'react';

class PrevButton extends React.Component {
  render() {
    return (
      <button className="play-prev-btn" onClick={this.props.playPrevTrack} >
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 487.91 487.91">
          <path d="M464.923,19.725c12.696,0,22.987,10.29,22.987,22.985v402.253c0,12.694-10.291,22.987-22.987,22.987L91.403,261.075 c0,0-17.239-17.238,0-34.477C108.642,209.358,464.923,19.725,464.923,19.725z"/>
          <path d="M76.821,443.271c0,13.76-11.155,24.915-24.915,24.915H24.915C11.155,468.186,0,457.031,0,443.271V44.639 c0-13.761,11.155-24.915,24.915-24.915h26.991c13.76,0,24.915,11.155,24.915,24.915V443.271z"/>
        </svg>
      </button>
    )
  }
}

export default PrevButton;