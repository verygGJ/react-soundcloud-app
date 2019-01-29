import React from 'react';

import { Link } from 'react-router-dom';
import { actionLoginUser, actionlogoutUser } from '../../store/actions';
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isLogin: this.props.isLoginState,
    username: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let logginChecked;
    this.props.registerUsers.some(user => {
      if (user.email === this.state.email && user.password === this.state.password) {
        logginChecked = true
      } else {
        logginChecked = false
      }
      return logginChecked;
    })

    if (logginChecked === true) {

      let email = {email: this.state.email};
      let password = {password: this.state.password};
      let loginUser = {}
      loginUser = {...email, ...password}

      this.setState({ isLogin: true }, () => this.props.actionLoginUser(loginUser, this.state.isLogin))
    } else {
      alert('ERROR LOGIN')
    }

  }

  componentDidMount() {
    let UserName;
    this.props.registerUsers.forEach(user => {
      if (user.email === this.props.isLoginUser.email && user.password === this.props.isLoginUser.password) {
        UserName = user.name;
        return UserName
      }
      return UserName
    }) 
    this.setState({ username: UserName });
  }

  logoutUser = () => {
    let loginUser = {}
    this.setState({ isLogin: false }, () => this.props.actionlogoutUser(loginUser, this.state.isLogin))
  }

  render() {
    if (this.state.isLogin === true) return <div className="area-user">
                                              <div className="area-user__title">
                                                Привет брат <span className="user-name">{this.state.username}</span>
                                              </div>
                                              <div className="area-user__text">
                                                теперь можешь создать свой <Link to="/playlist">Плейлист</Link>
                                              </div>
                                              <div className="logout-text">
                                                или можешь просто <span onClick={this.logoutUser} className="logout">Выйти в окно</span>
                                              </div>
                                            </div>

    return (
      <div className="area-page">
        <form className="login-form" onSubmit={this.handleSubmit} >
          <div className="login-form__title">Login</div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="email" 
              name="email"
              placeholder="email" 
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="password" 
              name="password"
              placeholder="password"  
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button className="submit-btn">Login</button>
        </form>
        <div className="">
          <Link to="/registration">Registration</Link>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    registerUsers: state.RegisterUsersState.registerUsers,
    isLoginState: state.LoginUsersState.isLoginState,
    isLoginUser: state.LoginUsersState.isLoginUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actionLoginUser: (loginUser, isLogin) => {
      dispatch(actionLoginUser(loginUser, isLogin))
    },
    actionlogoutUser: (loginUser, isLogin) => {
      dispatch(actionlogoutUser(loginUser, isLogin))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);