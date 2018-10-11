import React, { Component } from 'react';
// import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import Authenticator from "../../utils/Authenticator";
import "./Community.css";
import ForumTable from "../../components/Forums";
import ThreadTable from "../../components/Threads";
import PostTable from "../../components/Posts";
import CommunityForm from "../../components/CommunityForm";

class Community extends React.Component{
  // state renders the forums, threads, or posts based on state.page
  // it hangs on to the id's for forum, thread, and post for navigation and form entry
  state = {
    forums: [],
    page: 'forumList',
    forumId: '',
    forumName: '',
    threadId: '',
    threadName: '',
    formType: '',
    postId: '',
    postText: ''
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

  // navigation action when clicking on forum rows or thread rows
  handleRowClick = event => {
    if (event.target.getAttribute("class") === "forumTitle") {
      this.setState({
        page: "forum",
        forumId: event.target.getAttribute("data-id"),
        forumName: event.target.getAttribute("data-name")
      });
    } 
    else if (event.target.getAttribute("class") === "threadTitle") {
      this.setState({
        page: "thread",
        threadId: event.target.getAttribute("data-id"),
        threadName: event.target.getAttribute("data-name")
      });
    }
  };


  // "forum tree" is what I call the nav links near top of community page (i.e. "Forums > General")
  handleForumTreeClick = event => {
    console.log('waddup bitch')
    const linkId = event.target.getAttribute("data-id");
    if (linkId === "forum") {
      this.setState({
        page: "forumList",
        forumId: '',
        forumName: '',
      })
    } 
    else {
      this.setState({
        page: "forum",
        forumId: linkId,
        forumName: event.target.textContent,
        threadId: '',
        threadName: ''
      })
    }
  }

  // navigates to community form for new thread
  newThreadButton = event => {
    if (Authenticator.isAuthenticated) {
      this.setState({
        page: "form",
        formType: "newThread"
      })
    }
  }

  // submit button in the new thread form
  submitNewThread = newThread => {
    API.newForumThread(newThread)
    .then(res => {
      console.log(res)
      this.setState({
        page: "forum",
        forumId: newThread.forumId
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // navigates to community form for new post
  newPostButton = event => {
    if (Authenticator.isAuthenticated) {
      this.setState({
        page: "form",
        formType: "newPost",
        postId: '',
        postText: ''
      })
    }
  }

  // submit button in the new post form
  submitNewPost = newPost => {
    API.newForumPost(newPost)
    .then(res => {
      this.setState({
        page: "thread",
        threadId: newPost.threadId
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  // navigates to community form for editing a post
  editPostButton = event => {
    if (Authenticator.isAuthenticated) {
      this.setState({
        page: "form",
        formType: "editPost",
        postId: event.target.getAttribute("data-postid"),
        postText: event.target.getAttribute("data-posttext")
      })
    }
  }

  // submit button in the edit post form
  submitEditedPost = editedPost => {
    API.editForumPost(editedPost)
    .then(res => {
      this.setState({
        page: "thread",
        threadId: editedPost.threadId
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


  // this render includes 4 possible pages:
  // forums list, threads list, thread posts, or the form (create/edit posts/threads)
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
    } 
    else if (this.state.page === 'forum') {
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
            <div>
              <h1>{this.state.forumName}</h1>
              <button 
                  id="newThreadButton"
                  onClick={this.newThreadButton}
                >
                  + new thread
                </button>
              </div>
            <ThreadTable forumId={this.state.forumId} handleRowClick={this.handleRowClick}/>
        </div>
      )
    } 
    else if (this.state.page === 'thread') {
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
                + new post
              </button>
            </div>
            <PostTable threadId={this.state.threadId} editPostButton={this.editPostButton}/>
        </div>
      )
    } 
    else if (this.state.page === 'form') {
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
            <CommunityForm 
              formType={this.state.formType} 
              threadId={this.state.threadId} 
              submitNewPost={this.submitNewPost}
              submitEditedPost={this.submitEditedPost}
              submitNewThread={this.submitNewThread}
              postId={this.state.postId}
              postText={this.state.postText}
              forumId={this.state.forumId}
            />
        </div>
      )
    }
  };
};

export default Community;