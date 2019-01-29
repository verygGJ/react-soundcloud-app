import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from "react-redux";

class Header extends React.Component {
  state = {
    myPlaylistTracks: []
  }

  render() {
    const { isLoginState } = this.props;

    let showPlaylistLink = isLoginState ? <Link to="/playlist">Playlist</Link> : null;
    let areaText = isLoginState ? 'Area' : 'Login';

    return (
      <header className="header">
        <div className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="main-nav__item">
              {showPlaylistLink}
            </li>
            <li className="main-nav__item">
              <Link to="/login">{areaText}</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoginState: state.LoginUsersState.isLoginState
  }
}

export default connect(mapStateToProps)(Header);