import React from "react";
import "./CommentList.css";
import API from '../../utils/API';
import Comment from "../Comment";
import {FormBtn, TextArea} from '../Form';

// const comments = [{name: 'Vincent', text: 'This game is totally rad! I could play it forever. You should make more of this. ' , userId: 1, score: 5},
// {name: 'Hoff', text: 'I died on the first level.' , userId: 2, score: 10},
// {name: 'Vincent', text: 'This is just like Dark Souls.' , userId: 1, score: 7},
// {name: 'Aaron', text: 'Game of the century.', userId: 4, score: 20},
// {name: 'Jack', text: "There are some things that only videogames can do. For me, Flood's predecessor Fill was emblematic of all of them. Where most games do their best to be something else – to tell a story like a novel, to impress with cinematic techniques like a film – Fill is pure game, a complete and darkly fascinating vision that makes no concessions to the modern conception of how games should be. Instead, it was an exploration of how games could be; how bleak, how twisted, how focused and – most famously – how challenging. Most developers take pains to protect you from failure. FROM Software turns it into an artform.", userId: 3, score: 150},
// {name: 'Dinh', text: 'Overhyped.' , userId: 2, score: -24}]

class CommentList extends React.Component{
    state = {
      comments: [],
      newComment: ''
    }
    componentDidMount(){
      console.log('comments mounting!')
      this.getComments()
    }
    postComment = (gameId, text) => {
      //Requires user to be logged in. Text area should be grayed out when not signed in.
      API.postGameComment(gameId,text)
        .then((res) => {this.getComments()})
        .catch((err) => {console.log(err)})
    }
    getComments = () => {
      API.getGameComments(this.props.gameId)
        .then((res)=>{
          this.setState({comments: res.data})
        }).catch((err)=>{
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
          <div className="skinny">
            <h3>Comments</h3>
              <div className="form-group">
                <TextArea className="form-control" rows="4" onChange={this.handleInputChange} name="newComment"/>
                <FormBtn onClick={()=>{this.postComment(this.props.gameId,this.state.newComment)}}>Submit</FormBtn>
              </div>
              {this.state.comments.map((comment,i) => {
                return(<Comment username={comment.User.username} userId={comment.User.id} pattern={i%2} score={comment.score} createdAt={comment.createdAt} postId={comment.id}>{comment.text}</Comment>)
              })}


            
          </div>
      )}
}

export default CommentList;