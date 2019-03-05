import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Playlist from './components/playlist/index';
import MainPage from './components/home/index';
import Area from './components/area/index';
import Login from './components/login/index';
import Register from './components/registration/index';

import { connect } from "react-redux";
import { isLogin, fethcTracks } from './store/actions';

class App extends React.Component {

  loginUser = (email, password) => {
    let userPost = { "email": email, "password": password }
    axios
      .post("http://localhost:8000/api/user/login", userPost)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {

          let userData = {
            name: json.data.data.name,
            email: json.data.data.email,
          };

          let errorsData = {
            errorStatus: false,
            errorText: '',
            errorFields: []
          }

          let appState = { isLoggedIn: true, user: userData, errors: errorsData };
          localStorage["appState"] = JSON.stringify(appState);

          this.props.isLogin(appState.isLoggedIn, appState.user, appState.errors)
          this.props.history.push("/area")
          this.props.fethcTracks()

        } else {

          let errorsData = {
            errorStatus: true,
            errorText: json.data.error,
            errorFields: json.data.fields
          }

          this.props.isLogin(false, {}, errorsData)
        }

      })
      .catch(error => {
        console.log(`An Error Occured! ${error}`)
      });
  };

  registerUser = (name, email, password) => {
    let userPost = { "name": name, "email": email, "password": password }
    axios
      .post("http://localhost:8000/api/user/register", userPost)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {

          let userData = {
            name: json.data.data.name,
            email: json.data.data.email,
          };

          let errorsData = {
            errorStatus: false,
            errorText: '',
            errorFields: []
          }

          let appState = { isLoggedIn: true, user: userData, errors: errorsData };
          localStorage["appState"] = JSON.stringify(appState);

          this.props.isLogin(appState.isLoggedIn, appState.user, appState.errors)
          this.props.history.push("/area")
          this.props.fethcTracks()

        } else {
          let errorsData = {
            errorStatus: true,
            errorText: json.data.error,
            errorFields: json.data.fields
          }

          this.props.isLogin(false, {}, errorsData)
        }
      })
      .catch(error => {
        console.log("An Error Occured!" + error)
      });
  };

  logoutUser = (email) => {
    let userPost = { "email": email }
    axios
      .post("http://localhost:8000/api/user/logout", userPost)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {

          let errorsData = {
            errorStatus: false,
            errorText: '',
            errorFields: []
          }

          let appState = { isLoggedIn: false, user: {}, errors: errorsData };
          localStorage["appState"] = JSON.stringify(appState);

          this.props.isLogin(appState.isLoggedIn, appState.user, appState.errors)
          this.props.history.push("/login");

        } else alert("Logout Failed!");
      })
      .catch(error => { console.log(`An Error Occured! ${error}`) });
  };

  componentDidMount() {
    if (this.props.isLogin) {
      this.props.fethcTracks()
    }
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.props.isLogin(AppState.isLoggedIn, AppState.user, AppState.errors)
    }
  }

  render() {
    return (
      <div className="container">
        <React.Fragment>
          <Header />
        </React.Fragment>
        <Switch>
          <Route exact path='/'
            render={props => (
              <MainPage {...props} 
              />
            )}
          />
          <Route path='/playlist'
            render={props => (
              <Playlist {...props} 
              />
            )}
          />
          <Switch>
            <Route exact path="/area"
              render={props => (
                <Area {...props} 
                  logoutUser={this.logoutUser} 
                />
              )}
            />
            <Route path="/login"
              render={props => (
                <Login {...props} 
                  loginUser={this.loginUser}
                /> 
              )}
            />
            <Route path="/registration"
              render={props => (
                <Register {...props} 
                  registerUser={this.registerUser} 
                />
              )}
            />
          </Switch>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin,
    user: state.mainState.user,
    errors: state.mainState.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isLogin: (bool, user, errors) => {
      dispatch(isLogin(bool, user, errors))
    },
    fethcTracks: () => {
      dispatch(fethcTracks())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);