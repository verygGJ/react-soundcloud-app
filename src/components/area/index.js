import React from "react";
import { connect } from "react-redux";
import './index.scss';


const Area = ({logoutUser, user, isLogin, history }) => {
    
  const logout = (e) => {
    e.preventDefault();
    logoutUser(user.email)
  }

  if (!isLogin) {
    history.push("/login");
  }

  return (
    <div className="area">
      <h2>Welcome {user.name}</h2>
      <p>Now you can create your own unique playlist</p>
      <button className="logout-btn" onClick={logout} >Logout{" "}</button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    user: state.mainState.user
  }
}

export default connect(mapStateToProps)(Area);