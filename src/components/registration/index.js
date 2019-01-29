import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { registrationNewUser } from '../../store/actions';


class Registration extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    registerMessage: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registrationNewUser(this.state.name, this.state.email, this.state.password);
    this.setState({
      registerMessage: true
    })
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
              name="name"
              placeholder="Name" 
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
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
          <button className="submit-btn">Registration</button>
        </form>

        <div className="">
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
    registrationNewUser: (name, email, password) => {
      dispatch(registrationNewUser(name, email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);