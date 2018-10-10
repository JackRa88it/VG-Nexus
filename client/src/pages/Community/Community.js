import React, { Component } from 'react';
// import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Community.css";
import ForumTable from "../../components/Forums";
import ThreadTable from "../../components/Threads";
import PostTable from "../../components/Posts";
import CommunityForm from "../../components/CommunityForm";

class Community extends React.Component{
  state = {
    forums: [],
    page: 'forumList',
    forumId: '',
    forumName: '',
    threadId: '',
    threadName: '',
    formType: ''
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
        forumName: event.target.getAttribute("data-name")
      });
    } else if (event.target.getAttribute("class") === "threadTitle") {
      this.setState({
        page: "thread",
        threadId: event.target.getAttribute("data-id"),
        threadName: event.target.getAttribute("data-name")
      });
    }
  };

  handleForumTreeClick = event => {
    const linkId = event.target.getAttribute("data-id");
    if (linkId === "forum") {
      this.setState({
        page: "forumList",
        forumId: '',
        forumName: '',
      })
    } else {
      this.setState({
        page: "forum",
        forumId: linkId,
        forumName: event.target.textContent,
        threadId: '',
        threadName: ''
      })
    }
  }

  newPostButton = event => {
    //validate user here, either set page to form or "must be logged in"
    this.setState({
      page: "form",
      formType: "newPost"
    })
  }



  render(){
    if (this.state.page === 'forumList') {
      return(
        <div>
          <div className="forumTree">
            <p 
              className="forumTreeLink"
              data-id="forum"
              onClick={this.handleForumTreeClick}
            >
              Forums
            </p>
            <p>></p>
          </div>
          <h1>Nexus Forums</h1>
          <ForumTable forums={this.state.forums} handleRowClick={this.handleRowClick}/>
        </div>
      )
    } else if (this.state.page === 'forum') {
      return(
        <div>
            <div className="forumTree">
              <p 
                className="forumTreeLink"
                data-id="forum"
                onClick={this.handleForumTreeClick}
              >
                Forums
              </p>
              <p>></p>
            </div>
            <h1>{this.state.forumName}</h1>
            <ThreadTable forumId={this.state.forumId} handleRowClick={this.handleRowClick}/>
        </div>
      )
    } else if (this.state.page === 'thread') {
      return(
        <div>
            <div className="forumTree">
              <p 
                className="forumTreeLink"
                data-id="forum"
                onClick={this.handleForumTreeClick}
              >
                Forums
              </p>
              <p>></p>
              <p
                className="forumTreeLink"
                data-id={this.state.forumId}
                onClick={this.handleForumTreeClick}
              >
                {this.state.forumName}
              </p>
            </div>
            <div>
              <h1>{this.state.threadName}</h1>
              <button 
                id="newPostButton"
                onClick={this.newPostButton}
              >
                + post in thread
              </button>
            </div>
            <PostTable threadId={this.state.threadId}/>
        </div>
      )
    } else if (this.state.page === 'form') {
      return(
        <div>
            <div className="forumTree">
              <p 
                className="forumTreeLink"
                data-id="forum"
                onClick={this.handleForumTreeClick}
              >
                Forums
              </p>
              <p>></p>
              <p
                className="forumTreeLink"
                data-id={this.state.forumId}
                onClick={this.handleForumTreeClick}
              >
                {this.state.forumName}
              </p>
            </div>
            <div>
              <h1>{this.state.threadName}</h1>
            </div>
            <CommunityForm formType={this.state.formType} threadId={this.state.threadId}/>
        </div>
      )
    }
  };
};

export default Community;