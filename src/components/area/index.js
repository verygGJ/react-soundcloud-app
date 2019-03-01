import React from "react";

export default class Area extends React.Component {
  // state = {
  //   token: JSON.parse(localStorage["appState"]).user.auth_token,
  //   users: []
  // };

  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:8000/api/users/list?token=${this.state.token}`)
  //     .then(response => {
  //       console.log(response);
  //       return response;
  //     })
  //     .then(json => {
  //       if (json.data.success) {
  //         this.setState({ users: json.data.data });
  //         //alert("Login Successful!");
  //       } else alert("Login Failed!");
  //     })
  //     .catch(error => {
  //       alert(`An Error Occured! ${error}`);
  //     });
  // }

  render() {

    if (!this.props.isLoggedIn) {
      this.props.history.push("/login");
    }

    return (
      <div className="area">
        <h2>Welcome Home</h2>
        <button onClick={this.props.logoutUser} >Logout{" "}</button>
      </div>
    );
  }
}