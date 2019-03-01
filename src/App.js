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
    console.log(userPost)

    axios
      .post("http://localhost:8000/api/user/login", userPost)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(json => {
        if (json.data.success) {
          alert("Login Successful!");

          let appState = {
            isLoggedIn: true,
          };
          
          localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: appState.isLoggedIn
          }, () => {
            this.props.history.push("/area");
          });

        } else alert("Login Failed!");

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

          alert(`Registration Successful!`);

          let userData = {
            name: json.data.data.name,
            id: json.data.data.id,
            email: json.data.data.email,
          };

          let appState = {
            isLoggedIn: true,
            user: userData
          };

          localStorage["appState"] = JSON.stringify(appState);

          this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user,
            errors: false
          });

        } else {
          console.log(json)
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

  logoutUser = () => {
    let appState = {
      isLoggedIn: false
    };
    localStorage["appState"] = JSON.stringify(appState);
    
    this.setState({
      isLoggedIn: appState.isLoggedIn
    }, () => {
      this.props.history.push("/login");
    });

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