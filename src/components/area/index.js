import React from "react";
import { connect } from "react-redux";
import './index.scss';

class Area extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.user.email)
  }

  render() {

    if (!this.props.isLogin) {
      this.props.history.push("/login");
    }

    return (
      <div className="area">
        <h2>Welcome {this.props.user.name}</h2>
        <p>Now you can create your own unique playlist</p>
        <button className="logout-btn" onClick={this.logout} >Logout{" "}</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    user: state.mainState.user
  }
}

export default connect(mapStateToProps)(Area);