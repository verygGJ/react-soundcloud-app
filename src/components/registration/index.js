import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { registrationNewUser } from '../../store/actions';
import './style.css'


class Registration extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    registerMessage: false
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registrationNewUser(this.state.first_name, this.state.last_name, this.state.email, this.state.password);
    this.setState({ registerMessage: true })
  }


  render() {

    let regMessage = (this.state.registerMessage === true) ? 
      <div className="reg-message">
        Ваш аккаунт создан, если хочешь, что можешь залогинеться
        <Link to="/login">Login</Link>
      </div> : null

    return (
      <div className="area-page">
        {regMessage}

        <form className="login-form" onSubmit={this.handleSubmit} >
          <div className="login-form__title">Registration</div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="text" 
              name="first_name"
              placeholder="First Name" 
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="text" 
              name="last_name"
              placeholder="Last Name" 
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="email" 
              name="email"
              placeholder="Email" 
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input 
              className="main-input" 
              type="password" 
              name="password"
              placeholder="Password"  
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button className="submit-btn">Registration</button>
        </form>

        <div className="login-link">
          <Link to="/login">Login</Link>
        </div>
        
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    registerUsers: state.RegisterUsersState.registerUsers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registrationNewUser: (first_name, last_name, email, password) => {
      dispatch(registrationNewUser(first_name, last_name, email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);