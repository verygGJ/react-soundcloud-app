import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ history, loginUser = f => f }) => {
  let _email, _password;
  const handleLogin = e => {
    e.preventDefault();
    loginUser(_email.value, _password.value);
  };

  return (
    <div id="main">
      <form id="login-form" action="" onSubmit={handleLogin} method="post">
        <h3>Login Form</h3>
        <div className="form-block">
          <input ref={input => (_email = input)} 
                autoComplete="off" 
                id="email-input" 
                name="email" 
                type="text" 
                className="main-input" 
                placeholder="email" 
          />
        </div>
        <div className="form-block">
          <input ref={input => (_password = input)} 
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
      
      <Link to="/registration" >Register</Link>
    </div>
  );
};

export default  Login;