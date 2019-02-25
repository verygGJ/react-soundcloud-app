import React from "react";
import { Link } from "react-router-dom";

const Register = ({ history, registerUser = f => f }) => {
  let _email, _password, _name;
  const handleLogin = e => {
    e.preventDefault();
    registerUser(_name.value, _email.value, _password.value);
  };

  return (
    <div id="main">
      <form id="login-form" action="" onSubmit={handleLogin} method="post">
        <h3>Register Form</h3>
        <div className="form-block">
          <input ref={input => (_name = input)}  
                  autoComplete="off" 
                  id="email-input" 
                  name="email" 
                  type="text" 
                  className="main-input" 
                  placeholder="Name" 
          />
        </div>
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
                className="landing-page-btn" 
                id="email-login-btn" 
                href="#facebook" >
                Register
        </button>
      </form>
      
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;