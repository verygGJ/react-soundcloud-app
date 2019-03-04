import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {

    let errorText = this.props.errors.errorText ? 
                    <p className="error">{this.props.errors.errorText}</p> : '';
    
    let errorEmail = this.props.errors.errorFields && this.props.errors.errorFields.length > 0 ? 
                     this.props.errors.errorFields.indexOf('email') !== -1 : '';

    let errorPassword = this.props.errors.errorFields && this.props.errors.errorFields.length > 0 ? 
                        this.props.errors.errorFields.indexOf('password') !== -1 : '';

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

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    user: state.mainState.user,
    errors: state.mainState.errors
  }
}

export default connect(mapStateToProps)(Login);