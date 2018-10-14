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
        isValid: 'false'
      };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        if (this.state.password && this.state.email && this.state.username) {
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
                })
            }
        
    };
    validateEmail = () => {
        API.validateEmail(this.state.email)
        .then((res,err)=>{
            if (res.data) {
                alert('that email is already taken')
            }
            if (!res.data){
                this.handleFormSubmit()
            }
        })
    }

    //The order is a bit weird, but validate username is called on click and starts whole signup process
    validateUsername = event => {
        event.preventDefault()
        API.validateUser(this.state.username)
        .then((res,err)=>{
            if (res.data) {
                alert('that username is already taken')
            }
            if (!res.data){
                this.validateEmail()
            }
        })
    }
    render(){
        return(
            <div className="logsign-container">
               <h2 className="display-5 mb-4">SIGN UP</h2> 
               <div className="">
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
                    onClick={this.validateUsername}>
                    Submit
                </FormBtn>
              </div>
        </div>
        );
    }
}

export default Signup;