import React, { Component } from 'react';
import { Row, Col, Container } from "../../components/Grid"
import Login from "./Login";
import Signup from "./Signup";
import API from "../../utils/API";
import "./loginSignup.css";

class Login_Signup extends Component
{
  state = {
    isLogin: true
  };

  handleInputChange = event =>
  {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSwitch = event =>
  {
    const val = this.state.isLogin;

    this.setState({
      isLogin: !val
    })
  }

  handleSignUpSubmit = event =>
  {
    event.preventDefault();
    if (this.state.password && this.state.email && this.state.username) {
      console.log(this.state)
      API.signup({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      })
        .then(res => window.location.assign(res.data))
        .catch(err => {console.log(err.name); alert("That email alaready exists...")}); // TODO: switch on error
    }
  };
  render()
  {
    return (
      // THE VIEW FOR THE LOGIN / SIGNUP PAGE
      <div>
          {!this.state.isLogin ?
              <div className="logsign-container">
                <Signup />
                <div className="text-center">Need to  <u className="mr-1 linkable" onClick={this.handleSwitch}>log in</u> instead?</div>
              </div>
            :
              <div className="logsign-container">
                <Login />
                <div className="text-center" >
                 Don't have an account?  Sign up<u className="mx-1 linkable" onClick={this.handleSwitch}>here</u></div>
              </div>
          }

          {this.state.isLogin ? (<div>

          </div>
          ) :
            <div className="linkable">
            </div>

          }
      </div>

    );
  }
}
export default Login_Signup