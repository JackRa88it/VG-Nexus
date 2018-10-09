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
    forumId: '',
    forumName: ''
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
        forumId: event.target.getAttribute("data-id"),
        forumName: event.target.textContent.toUpperCase()
      })
    }
  };

  handleForumTreeClick = event => {
    const linkId = event.target.getAttribute("data-id");
    if (linkId === "forum") {
      this.setState({
        page: "forumList",
        forumId: '',
        forumName: ''
      })
    } else {
      this.setState({
        page: "forum",
        forumId: linkId,
        forumName: event.target.textContent.toUpperCase()
      })
    }
  }



  render(){
    if (this.state.page === 'forumList') {
      return(
        <div>
            <h2 
              className="forumTreeLink"
              data-id="forum"
              onClick={this.handleForumTreeClick}
            >
              FORUMS
            </h2>
            <ForumTable forums={this.state.forums} handleRowClick={this.handleRowClick}/>
        </div>
      )
    } else if (this.state.page === 'forum') {
      return(
        <div>
            <div className="forumTree">
              <h2 
                className="forumTreeLink"
                data-id="forum"
                onClick={this.handleForumTreeClick}
              >
                FORUMS
              </h2>
              <h2>></h2>
              <h2
                className="forumTreeLink"
                data-id={this.state.forumId}
                onClick={this.handleForumTreeClick}
              >
                {this.state.forumName}
              </h2>
            </div>
            <ThreadTable forumId={this.state.forumId}/>
        </div>
      )
    }
  };
};

export default Community;