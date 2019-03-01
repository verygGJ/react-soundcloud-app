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

    let errorText = this.props.errors ? <p className="error">{this.props.textError}</p> : '';
    
    let errorEmail = this.props.errorsFields && this.props.errorsFields.length > 0 ? 
                     this.props.errorsFields.indexOf('email') !== -1 : '';

    let errorPassword = this.props.errorsFields && this.props.errorsFields.length > 0 ? 
                        this.props.errorsFields.indexOf('password') !== -1 : '';

    return (
      <div id="main">
      <form className="form" id="login-form" action="" onSubmit={this.handleLogin} method="post">
        <h3>Login Form</h3>
        {errorText}
        <div className="form-block">
          <input onChange={this.handleChange}
                autoComplete="off" 
                name="email" 
                type="email" 
                className={errorEmail ? 'main-input error' : 'main-input'}
                placeholder="email" 
          />
        </div>
        <div className="form-block">
          <input onChange={this.handleChange}
                autoComplete="off" 
                name="password" 
                type="password" 
                className={errorPassword ? 'main-input error' : 'main-input'}
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