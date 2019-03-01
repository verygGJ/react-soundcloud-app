import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Playlist from './components/playlist/index';
import MainPage from './components/home/index';
import Area from './components/area/index';
import Login from './components/login/index';
import Register from './components/registration/index';


class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {},
    errors: false,
    textError: '',
    errorsFields: []
  };

  _loginUser = (email, password) => {
    let userPost = {
      "email": email,
      "password": password
    }

    axios
      .post("http://localhost:8000/api/user/login/", userPost)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert("Login Successful!");

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          });
        } else alert("Login Failed!");

      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
      });
  };

  _registerUser = (name, email, password) => {
    let userPost = {
      "name": name,
      "email": email,
      "password": password
    }

    axios
      .post("http://localhost:8000/api/user/register", userPost)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert(`Registration Successful!`);

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
            auth_token: json.data.data.auth_token,
            timestamp: new Date().toString()
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user,
            errors: false,
            errorsFields: []
          });
        } else {
          console.log(json.data.fields)
          console.log(json)
          this.setState({
            errors: true,
            textError: json.data.error,
            errorsFields: json.data.fields
          })
        }
      })
      .catch(error => {
        alert("An Error Occured!" + error);
      });
  };

  _logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
  };

  componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ 
        isLoggedIn: AppState.isLoggedIn, 
        user: AppState 
      });
    }
  }

  render() {
    return (
      <div className="container">
        <React.Fragment>
          <Header user={this.state.user} />
        </React.Fragment>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path='/playlist' component={Playlist} />
          <Switch>
            <Route exact path="/area"
              render={props => (
                <Area {...props} logoutUser={this._logoutUser} user={this.state.user} />
              )}
            />
            <Route path="/login"
              render={props => 
                <Login {...props} loginUser={this._loginUser} 
              />}
            />
            <Route path="/registration"
              render={props => (
                <Register {...props} 
                  registerUser={this._registerUser} 
                  errors={this.state.errors} 
                  textError={this.state.textError} 
                  errorsFields={this.state.errorsFields}
                />
              )}
            />
          </Switch>
        </Switch>
      </div>
    )
  }
}

export default App;