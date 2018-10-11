import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Authenticator from '../../utils/Authenticator';
import "./Profile.css";

class Profile extends Component {
  state = {
    username: '',
    user: undefined
  }
  componentDidMount() {
    Authenticator.authenticate(() => {
      this.setState({ authenticated: true,
         username:  Authenticator.username,
         user: Authenticator.user})
    })
  }

  render(){ 
    return (
      <div>
          <h1>{this.state.username}</h1>
      </div>
    )
  }
}
export default Profile;