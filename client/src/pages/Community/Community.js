import React, { Component } from 'react';
// import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Community.css";
import ForumTable from "../../components/Forums";
import ThreadTable from "../../components/Threads";

class Community extends React.Component{
  state = {
    forums: [],
    page: 'forumList',
    forumId: ''
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

  handleRowClick = event => {
    if (event.target.getAttribute("class") === "forumTitle") {
      this.setState({
        page: "forum",
        forumId: event.target.getAttribute("data-id")
      })
    }
  };





  render(){
    if (this.state.page === 'forumList') {
      return(
        <div>
            <a href="/community"><h1>FORUMS</h1></a>
            <ForumTable forums={this.state.forums} handleRowClick={this.handleRowClick}/>
        </div>
      )
    } else if (this.state.page === 'forum') {
      return(
        <div>
            <a href="/community"><h1>FORUMS > THREADS</h1></a>
            <ThreadTable forumId={this.state.forumId}/>
        </div>
      )
    }
  };
};

export default Community;