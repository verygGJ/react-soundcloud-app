import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    let areaLink = this.props.isLogin ? 'Area' : 'Login';
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
              <Link to="/area">{areaLink}</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
  }
}

export default connect(mapStateToProps)(Header);