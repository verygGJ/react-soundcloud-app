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
import { isLogin, noLogin } from './store/actions';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {},
    errors: false,
    textError: '',
    errorsFields: []
  };

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

          let appState = { isLoggedIn: true, user: userData };
          localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user,
            errors: false
          }, () => {
            this.props.history.push("/area");
          });

          this.props.isLogin(true)

          console.log(this.props.isLogin())

        } else {

          this.props.noLogin(true)

          this.setState({
            errors: true,
            textError: json.data.error,
            errorsFields: json.data.fields
          })
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

          let appState = { isLoggedIn: true, user: userData };
          localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user,
          });

        } else {
          this.setState({
            errors: true,
            textError: json.data.error,
            errorsFields: json.data.fields
          })
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

          let appState = { isLoggedIn: false, user: {} };
          localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
          }, () => {
            this.props.history.push("/login");
          });
        } else alert("Logout Failed!");
      })
      .catch(error => { console.log(`An Error Occured! ${error}`) });
  };

  componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ 
        isLoggedIn: AppState.isLoggedIn, 
        user: AppState.user
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
          <Route exact path='/'
            render={props => (
              <MainPage {...props} 
                user={this.state.user}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />
          <Route path='/playlist'
            render={props => (
              <Playlist {...props} 
                user={this.state.user}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />
          <Switch>
            <Route exact path="/area"
              render={props => (
                <Area {...props} 
                  logoutUser={this.logoutUser} 
                  isLoggedIn={this.state.isLoggedIn} 
                  user={this.state.user}
                />
              )}
            />
            <Route path="/login"
              render={props => (
                <Login {...props} 
                  loginUser={this.loginUser} 
                  errors={this.state.errors} 
                  textError={this.state.textError} 
                  errorsFields={this.state.errorsFields}
                /> 
              )}
            />
            <Route path="/registration"
              render={props => (
                <Register {...props} 
                  registerUser={this.registerUser} 
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

function mapStateToProps(state) {
  return {
    isLogin: state.mainState.isLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isLogin: (bool) => {
      dispatch(isLogin(bool))
    },
    noLogin: (bool) => {
      dispatch(noLogin(bool))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);