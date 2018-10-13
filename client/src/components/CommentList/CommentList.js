import React from "react";
import "./CommentList.css";
import API from '../../utils/API';
import Comment from "../Comment";
import {FormBtn, TextArea} from '../Form';

class CommentList extends React.Component{
    state = {
      comments: [],
      newComment: ''
    }
    componentDidMount(){
      this.getComments(this.props.gameId)
    }
    componentWillReceiveProps(nextProps){
      this.getComments(nextProps.gameId)
    }
    postComment = (gameId, text) => {
      //Requires user to be logged in. Text area should be grayed out when not signed in.
      API.postGameComment(gameId,text)
        .then((res) => {this.getComments(gameId)})
        .catch((err) => {console.log(err)})
    }
    getComments = (gameId) => {
      API.getGameComments(gameId)
        .then((res)=>{
          console.log(res)
          this.setState({comments: res.data})
        }).catch((err)=>{
          console.log(err)
        })
    }
    voteHandler = (postId,bool) => {
        API.postVote(postId,bool)
        .then((res)=>{
          this.getComments(this.props.gameId)
        })
        .catch((err) =>{
          console.log(err)
        })
    }
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    render(){
      return (
          <div>
            <h3>Comments</h3>
              <div className="form-group w-85 text-center">
                <TextArea className="form-control" rows="4" onChange={this.handleInputChange} name="newComment"/>
                <FormBtn onClick={()=>{this.postComment(this.props.gameId,this.state.newComment)}}>Submit</FormBtn>
              </div>
              {this.state.comments.map((comment,i) => {
                return(<Comment username={comment.User.username} userId={comment.User.id} pattern={i%2} score={comment.score} 
                  createdAt={comment.createdAt} postId={comment.id} upVoted={comment.upVoted} downVoted={comment.downVoted}
                  downVoteHandler={() => this.voteHandler(comment.id,false)} upVoteHandler={() => this.voteHandler(comment.id,true)}>{comment.text}</Comment>)
              })}
          </div>
      )}
}

export default CommentList;