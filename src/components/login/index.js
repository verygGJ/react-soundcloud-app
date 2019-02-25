import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ history, loginUser = f => f }) => {
  let email, password;
  const handleLogin = e => {
    e.preventDefault();
    loginUser(email.value, password.value);
  };

  return (
    <div id="main">
      <form className="form" id="login-form" action="" onSubmit={handleLogin} method="post">
        <h3>Login Form</h3>
        <div className="form-block">
          <input ref={input => (email = input)} 
                autoComplete="off" 
                id="email-input" 
                name="email" 
                type="text" 
                className="main-input" 
                placeholder="email" 
          />
        </div>
        <div className="form-block">
          <input ref={input => (password = input)} 
                autoComplete="off" 
                id="password-input" 
                name="password" 
                type="password" 
                className="main-input" 
                placeholder="password" 
          />
        </div>
        <button type="submit" 
                className="submit-btn" 
                id="email-login-btn" 
                href="#facebook" >
          Login
        </button>
      </form>
      
      <Link className="tab-link" to="/registration" >Register</Link>
    </div>
  );
};

export default  Login;