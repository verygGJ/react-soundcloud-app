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

  loginUser = (email, password) => {
    let userPost = { "email": email, "password": password }
    axios
      .post("http://localhost:8000/api/user/login", userPost)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert("Login Successful!");

          let userData = {
            name: json.data.data.name,
            email: json.data.data.email,
          };

          // let appState = { isLoggedIn: true, user: userData };
          // localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: true,
            user: userData,
            errors: false
          }, () => {
            this.props.history.push("/area");
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

          // let appState = { isLoggedIn: true, user: userData };
          // localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: true,
            user: userData,
            errors: false
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

  // logoutUser = () => {
  //   // let appState = {
  //   //   isLoggedIn: false,
  //   //   user: {}
  //   // };
  //   // localStorage["appState"] = JSON.stringify(appState);
  //   this.setState({
  //     isLoggedIn: false,
  //     user: {}
  //   }, () => {
  //     this.props.history.push("/login");
  //   });
  // };

  logoutUser = (email) => {
    let userPost = { "email": email }
    axios
      .post("http://localhost:8000/api/user/logout", userPost)
      .then(response => {
        return response;
      })
      .then(json => {
        if (json.data.success) {
          this.setState({
            isLoggedIn: false,
            user: {}
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

export default App;