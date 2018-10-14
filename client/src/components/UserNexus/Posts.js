import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Authenticator from '../../utils/Authenticator';
import UserPostRow from "./UserPostRow";
class Posts extends Component {
    state = {
        posts: [],
        threadId: ''
      };
      componentDidMount()
    { 

      
      API.getUserPosts()
        .then(Posts =>
        {
          // console.log(user);
          // console.log(user.data);
          this.setState({
            posts: Posts.data,
          })
        })
        .catch(err =>
        {
          console.log(err)
        })
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                <table className="postTable">
        {this.state.posts.map(post => {
          return(
            <UserPostRow 
              key={post.id}
              post={post} 
            />
          )
        })}
      </table>
            </div>
        )
    }

}
export default Posts;