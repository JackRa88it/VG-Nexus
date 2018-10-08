import React, { Component } from 'react';
import { Row, Col, Container } from "../../components/Grid"
import Login from "./Login";
import Signup from "./Signup";
import API from "../../utils/API";

class Login_Signup extends Component
{
  state = {
    isLogin: "false"
  };

  handleInputChange = event =>
  {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSignUpSubmit = event =>
  {
    event.preventDefault();
    if (this.state.password && this.state.email && this.state.username) {
      console.log(this.state)
      API.signup({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        bio: this.state.bio,
        postBanner: this.state.postBanner
      })
        .then(res => window.location.assign(res.data))
        .catch(err => console.log(err));
    }
  };
  render()
  {
    return (
      // THE VIEW FOR THE LOGIN / SIGNUP PAGE
      <div>
        <Row>
          <Col size="md-6">
            <div className="mr-4">
              <Signup />
            </div>
          </Col>

          <Col size="md-6">
            <div className="ml-5">
              <Login />
            </div>
          </Col>


        </Row>





      </div>

    );
  }
}
export default Login_Signup