import React, { Component } from 'react';
// import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Community.css";
import ForumTable from "../../components/Forums";

class Community extends React.Component{
  state = {
    forums: []
  };

  componentDidMount(){
    API.getForumList()
    .then((res) => {
      if(res.data){
        this.setState({
            forums: res.data
          })
      }
    })
}

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.password && this.state.email) {
  //       console.log(this.state)
  //     API.login({
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //       .then(res => window.location.assign(res.data))
  //       .catch(err => console.log(err));
  //   }
  // };

  render(){
    return(
      <div>
          <a href="/community"><h1>FORUMS</h1></a>
          <ForumTable forums={this.state.forums}/>
      </div>
    )
  };
};

export default Community;