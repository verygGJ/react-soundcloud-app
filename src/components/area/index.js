import React from "react";
import { connect } from "react-redux";

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
        <button onClick={this.logout} >Logout{" "}</button>
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