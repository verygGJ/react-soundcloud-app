import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  state = {
    myPlaylistTracks: []
  }

  render() {
    return (
      <header className="header">
        <div className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to="/">Home</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/playlist">Playlist</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/area">Login</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header;