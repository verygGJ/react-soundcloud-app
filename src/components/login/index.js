import React from 'react';
import { Link } from 'react-router-dom';


class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    return (
      <div id="main">
      <form className="form" id="login-form" action="" onSubmit={this.handleLogin} method="post">
        <h3>Login Form</h3>
        <div className="form-block">
          <input onChange={this.handleChange}
                autoComplete="off" 
                name="email" 
                type="email" 
                className="main-input" 
                placeholder="email" 
          />
        </div>
        <div className="form-block">
          <input onChange={this.handleChange}
                autoComplete="off" 
                name="password" 
                type="password" 
                className="main-input" 
                placeholder="password" 
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <Link className="tab-link" to="/registration" >Register</Link>
    </div>
    );
  }

};

export default  Login;