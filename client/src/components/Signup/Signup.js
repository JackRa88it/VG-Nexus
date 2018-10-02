import React, { Component } from 'react';
import axios from "axios";

class Signup extends Component{
    signupSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData)
        axios.post("/api/signup",formData)
            .then(res =>
                console.log(res)
            ).catch(err => console.log(err))
        return false
    }
    render(){
        return(
            <div>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Sign Up Form</h2>
        <form class="signup" onSubmit={this.signupSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email" name='email' />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password" name='password'/>
          </div>
          <div id="alert" class="alert alert-danger" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          </div>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
    </div>
  </div>
  </div>
        )
    }
}

export default Signup;
