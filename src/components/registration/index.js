import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state.name, this.state.email, this.state.password);
  };

  render() {
    let errorText = this.props.errors ? <p className="error">{this.props.textError}</p> : '';
    
    let errorName = this.props.errorsFields && this.props.errorsFields.length > 0 ? 
                    this.props.errorsFields.indexOf('name') !== -1 : '';

    let errorEmail = this.props.errorsFields && this.props.errorsFields.length > 0 ? 
                     this.props.errorsFields.indexOf('email') !== -1 : '';

    let errorPassword = this.props.errorsFields && this.props.errorsFields.length > 0 ? 
                        this.props.errorsFields.indexOf('password') !== -1 : '';
    
    return (
      <div id="main">
        <form className="form" id="login-form" action="" onSubmit={this.handleLogin} method="post">
          <h3>Register Form</h3>
          {errorText}
          <div className="form-block">
            <input ref={input => (this.inputName = input)}  
                   autoComplete="off" 
                   name="name" 
                   type="text"
                   className={errorName ? 'main-input error' : 'main-input'}
                   placeholder="Name" 
                   onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input ref={input => (this.inputEmail = input)} 
                   autoComplete="off" 
                   name="email" 
                   type="email" 
                   className={errorEmail ? 'main-input error' : 'main-input'}
                   placeholder="email" 
                   onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <input ref={input => (this.inputPassword = input)} 
                   autoComplete="off" 
                   name="password" 
                   type="password" 
                   className={errorPassword ? 'main-input error' : 'main-input'}
                   placeholder="password" 
                   onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <Link className="tab-link" to="/login">Login</Link>
      </div>
    );
  }

};

export default Register;