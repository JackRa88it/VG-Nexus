import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Login extends Component{
    state = {
        email: '',
        password: '',
      };
    // loginSubmit(event){
    //     event.preventDefault()
    //     console.log('post!')
    //     const formData = new FormData(event.target)
    //     axios.post("/api/login",formData)
    //         .then(res =>
    //             console.log(res)
    //         ).catch(err => console.log(err))
    //     return false
    // }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        if (this.state.title && this.state.author) {
          API.login({
            email: this.state.email,
            password: this.state.password
          })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    };
    render(){
        return(
            <div>
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
