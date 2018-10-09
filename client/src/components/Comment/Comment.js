import React, {Component} from "react";
import "./Comment.css";
import API from '../../utils/API';
import { Link } from "react-router-dom";
import { Row, Col } from "../Grid"

var moment = require('moment')

class Comment extends Component{
  state = {
    upvotes: 0,
    downvotes: 0,
  }

  vote(bool){
    API.votePost(this.props.postId,bool)
    .then((res)=>{
      if(res.data[0]){
        this.setState({upvotes: res.data[0].count, downvotes: res.data[1].count})
      }
      // else{
      //   this.setState({upvotes: res.data[0].count, downvotes
      // }
    })
    .catch((err) =>{
      console.log(err)
    })
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
          <div>({this.props.score})</div>
          <div>
            <div className ='upvote' onClick={()=>{this.vote(true)}}>+</div><div className = 'downvote' onClick={()=>{this.vote(false)}}>-</div>
          </div>
        </div>
      </div>
    
    )
  }
}

export default Comment;