import React from "react";
import "./Posts.css";
import PostRow from "./PostRow";
import API from "../../utils/API";

class PostTable extends React.Component{

  state = {
    posts: [],
    threadId: ''
  };

  componentDidMount(){
    API.getPostList(this.props.threadId)
    .then((res) => {
      if(res.data){
        this.setState({
            posts: res.data,
            threadId: this.props.threadId
          })
      }
    })
  }
 
  render(){
    return (
      <table className="postTable">
        <tbody>
          {this.state.posts.map(post => {
            return(
              <PostRow 
                key={post.id}
                post={post} 
                editPostButton={this.props.editPostButton}
                handleUsernameClick={this.props.handleUsernameClick}
                />
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default PostTable;