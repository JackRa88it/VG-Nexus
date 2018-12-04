import React, { Component } from 'react';
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import Authenticator from "../../utils/Authenticator"
class Login extends Component
{
    state = {
        email: '',
        password: '',
    };

    handleInputChange = event =>
    {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    handleFormSubmit = event =>
    {
        event.preventDefault();
        // only try logging in if both inputs are valid
        if (this.state.password && this.state.email) {
            console.log(this.state)
            API.login({
                email: this.state.email,
                password: this.state.password
            })
                /*   succesful login updates Authenticator instance with user 
                     information and refreshs the page with new authentication data
                */
                .then(res =>
                {
                    Authenticator.authenticate(() =>
                    {
                        window.location.assign(res.data)
                    })
                })
                .catch(err =>
                {
                    console.log(err);
                    alert("Either your email or password is invalid")
                });
        }
    };
    render()
    {
        return (
            <div className="logsign-container ">
                <h2 className="display-5 mb-3">Login</h2>

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
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </div>

                <div className="pt-2">
                    <FormBtn
                        disabled={!(this.state.password && this.state.email)}
                        onClick={this.handleFormSubmit}>
                        Submit
                </FormBtn>
                </div>
            </div>
        )
    }
}
export default Login;