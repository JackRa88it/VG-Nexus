import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Login extends Component{
    state = {
        email: '',
        password: '',
      };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.password && this.state.email) {
            console.log(this.state)
          API.login({
            email: this.state.email,
            password: this.state.password
          })
            .then(res => window.location.assign(res.data))
            .catch(err => console.log(err));
        }
    };
    render(){
        return(
            <div>
                LOG IN(slot this into a modal later)
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="Email"
                />
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="Password"
                />
                <br></br>
                <br></br>
                <FormBtn
                    disabled={!(this.state.password && this.state.email)}
                    onClick={this.handleFormSubmit}>
                    Submit
                </FormBtn>
            </div>
        )
    }
}

export default Login;
