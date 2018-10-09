import React, {Component} from "react";
import "./Comment.css";
import API from '../../utils/API';
import { Link } from "react-router-dom";

var moment = require('moment')

class Comment extends Component{
  state = {
    upVotes: 0,
    downVotes: 0,
    upVoted: false,
    downVoted: false,
  }

  vote(bool){
    console.log('voting!')
    API.postVote(this.props.postId,bool)
    .then((res)=>{
      this.getVotes()
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  getVotes(){
    console.log('getting votes')
    API.getVote(this.props.postId)
    .then((res)=>{
      console.log(res.data,'asdfasdfasdf')
      if(res.data.downVoted){
        this.setState({downVoted: true})
      }
      else{
        this.setState({downVoted: false})
      }
      if(res.data.upVoted){
        this.setState({upVoted: true})
      }
      else{
        this.setState({upVoted: false})
      }
      var upVotes = 0
      var downVotes = 0
      res.data.votes.forEach(element => {
        console.log(element)
        if(element.upDown === 0){
          downVotes = element.counts
        }
        else if(element.upDown === 1){
          upVotes = element.counts
        }
        this.setState({upVotes: upVotes,downVotes: downVotes})
      });
    })
  }

  componentDidMount(){
    this.getVotes()
  }

  render(){
    return(
      <div className={"wrapper pattern"+ this.props.pattern} >
        <div className='userThumbnail'>
          <img src={'/assets/userThumbnails/' + this.props.userId} alt='user_img' />
        </div>
        <div className='commentInfo'>
          <Link to={'/user/' + this.props.userId} ><div className='username'>{this.props.username}</div></Link>
          <div className = 'date'>{moment(this.props.createdAt).format('MMM DD HH:mm')}</div>
        </div>
        <div className="comment">
          {this.props.children}
        </div>
        <div className="score">
          <div>({this.state.upVotes - this.state.downVotes})</div>
          <div>
            <div className ={'upvote ' + (this.state.upVoted ? 'upvoted' : '')} onClick={(this.state.upVoted ? ()=>{} : ()=>{this.vote(true)})}>+</div>
            <div className = {'downvote ' + (this.state.downVoted ? 'downvoted' : '')} onClick={(this.state.downVoted ? ()=>{} : ()=>{this.vote(false)})}>-</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;