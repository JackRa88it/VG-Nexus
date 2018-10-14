import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import {Container} from "../../components/Grid"

class Signup extends Component{
    state = {
        email: '',
        password: '',
        username: '',
        bio: '',
        postBanner: '',
      };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.password && this.state.email && this.state.username) {
            // console.log(this.state)
            API.signup({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                bio: '',
                postBanner: ''
                }).then( (res,err) => {
                    if(!err && res.status==200){
                    window.location.assign(res.data)
                    }
                    else{ alert('email already taken')}
                })
            }
        
    };
    render(){
        return(
            <div className="logsign-container">
               <h2 className="display-5 mb-4">SIGN UP</h2> 
               <div className="mb-2">
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="Username"
                />
                </div>
             <div className="pt-2">
                <FormBtn
                    disabled={!(this.state.password && this.state.email && this.state.username)}
                    onClick={this.handleFormSubmit}>
                    Submit
                </FormBtn>
              </div>
        </div>
        );
    }
}

export default Signup;