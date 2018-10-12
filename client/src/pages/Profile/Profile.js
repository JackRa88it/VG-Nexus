import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Row, Container} from "../../components/Grid"
import Authenticator from '../../utils/Authenticator';
import "./Profile.css";

class Profile extends Component {
  state = {
    username: '',
    user: {}
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
          <Row>
            <h1>{this.state.username}</h1>
            <p>{this.state.user.bio}</p>
          </Row>
          <Row>
            <h3>{this.state.user.postBanner}</h3>
          </Row>          
      </div>
    )
  }
}
export default Profile;