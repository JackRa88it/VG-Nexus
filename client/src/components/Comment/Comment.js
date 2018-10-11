import React, {Component} from "react";
import "./Comment.css";
import API from '../../utils/API';
import { Link } from "react-router-dom";

var moment = require('moment')

class Comment extends Component{
  render(){
    return(
      <div className={"wrapper pattern"+ this.props.pattern} >
        <div className='userThumbnail'>
          <img src={'/assets/userThumbnails/' + this.props.userId} alt='user_img' />
        </div>
        <div className='commentInfo'>
          <Link to={'/user/' + this.props.userId} ><div className='username'>{this.props.username}</div></Link>
          <div className = 'date'>{moment(this.props.createdAt).format('MMM DD hh:mm a')}</div>
        </div>
        <div className="comment">
          {this.props.children}
        </div>
        <div className="score">
          <div>({this.props.score})</div>
          <div>
            <div className ={'upvote ' + (this.props.upVoted ? 'upvoted' : '')} onClick={(this.props.upVoted ? ()=>{} : this.props.upVoteHandler)}>+</div>
            <div className = {'downvote ' + (this.props.downVoted ? 'downvoted' : '')} onClick={(this.props.downVoted ? ()=>{} : this.props.downVoteHandler)}>-</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;