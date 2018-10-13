import React, { Component } from 'react';
import { Row, Col, Container } from "../../components/Grid"
import Login from "./Login";
import Signup from "./Signup";
import API from "../../utils/API";

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
        bio: this.state.bio,
        postBanner: this.state.postBanner
      })
        .then(res => window.location.assign(res.data))
        .catch(err => console.log(err)); // TODO: switch on error
    }
  };
  render()
  {
    return (
      // THE VIEW FOR THE LOGIN / SIGNUP PAGE
      <div className='ml-auto'>
        <Row>
          {this.state.isLogin ?
            <Col size="md-6" className="col-md-offset-3">
              <Container lighter>

                <Signup />
                Try loggin in <u className="mr-1" onClick={this.handleSwitch}>here</u>!
              </Container>

            </Col>
            :
            <Col size="md-6">
              <Container lighter>
                <Login />
                Don't have an account? <br />You can sign up
             <u className="mx-1" onClick={this.handleSwitch}>here</u>
              </Container>

            </Col>

          }

          {this.state.isLogin ? (<div>

          </div>
          ) :
            <div className="linkable">
            </div>

          }




        </Row>





      </div>

    );
  }
}
export default Login_Signup