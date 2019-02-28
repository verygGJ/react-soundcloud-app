import React from "react";
import { Link } from "react-router-dom";

const Register = ({ errors, textError, errorsFields, registerUser = f => f }) => {

  let _email, _password, _name;
  const handleLogin = e => {
    e.preventDefault();
    registerUser(_name.value, _email.value, _password.value);
  };

  let errorText = errors ? <p className="error">{textError}</p> : '';


  let errorName = errorsFields && errorsFields.length > 0 ? errorsFields.indexOf('name') !== -1 : '';
  let errorEmail = errorsFields && errorsFields.length > 0 ? errorsFields.indexOf('email') !== -1 : '';
  let errorPassword = errorsFields && errorsFields.length > 0 ? errorsFields.indexOf('password') !== -1 : '';
  
  console.log(errorsFields)

    return (
      <div id="main">
        <form className="form" id="login-form" action="" onSubmit={handleLogin} method="post">
          <h3>Register Form</h3>
          {errorText}
          <div className="form-block">
            <input ref={input => (_name = input)}  
                    autoComplete="off" 
                    id="email-input" 
                    name="email" 
                    type="text" 
                    className={errorName ? 'main-input error' : 'main-input'}
                    placeholder="Name" 
            />
          </div>
          <div className="form-block">
            <input ref={input => (_email = input)} 
                  autoComplete="off" 
                  id="email-input" 
                  name="email" 
                  type="text" 
                  className={errorEmail ? 'main-input error' : 'main-input'}
                  placeholder="email" 
            />
          </div>
          <div className="form-block">
            <input ref={input => (_password = input)} 
                  autoComplete="off" 
                  id="password-input" 
                  name="password" 
                  type="password" 
                  className={errorPassword ? 'main-input error' : 'main-input'}
                  placeholder="password" 
            />
          </div>
          <button type="submit" 
                  className="submit-btn" 
                  id="email-login-btn" 
                  href="#facebook" >
                  Register
          </button>
        </form>
        
        <Link className="tab-link" to="/login">Login</Link>
      </div>
    );

};

export default Register;