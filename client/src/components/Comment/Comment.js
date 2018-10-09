import React, {Component} from "react";
import "./Comment.css";
import API from '../../utils/API';
import { Link } from "react-router-dom";

var moment = require('moment')

class Comment extends Component{
  state = {
    upvotes: 0,
    downvotes: 0,
    voted: false,
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
      this.setState({voted: res.data.voted})
      if(res.data.votes[0]){
        this.setState({downvotes: res.data.votes[0].count})
      }
      if(res.data.votes[1]){
        this.setState({upvotes: res.data.votes[1].count})
      }
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
          <div>({this.state.upvotes - this.state.downvotes})</div>
          <div>
            <div className ={'upvote ' + (this.state.voted ? 'upvoted' : '')} onClick={(this.state.voted ? ()=>{} : ()=>{this.vote(true)})}>+</div><div className = {'downvote ' + (this.state.voted ? 'downvoted' : '')} onClick={(this.state.voted ? ()=>{} : ()=>{this.vote(true)})}>-</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;