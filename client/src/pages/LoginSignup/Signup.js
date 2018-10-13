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
            bio: this.state.bio,
            postBanner: this.state.postBanner
          })
            .then(res => window.location.assign(res.data))
            .catch(err => console.log(err));
        }
    };
    render(){
        return(
            <div>
               <h2 className="display-5 mb-4">SIGN UP</h2> 
               <div className="mb-2">
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="Email"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="Username"
                />
                </div>
                {/* <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="bio"
                    type="text"
                    placeholder="Tell me about yourself"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="postBanner"
                    type="text"
                    placeholder="Your Banner text!"
                />   
                                              */}
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