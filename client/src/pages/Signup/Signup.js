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
        <h2>Sign Up Form</h2>
        <form class="signup" onSubmit={this.signupSubmit}>
            Email: <input type="email" class="form-control" id="email-input" placeholder="Email" name='email' /> <br></br>
            Password: <input type="password" class="form-control" id="password-input" placeholder="Password" name='password'/><br></br><br></br>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
        )
    }
}

export default Signup;
