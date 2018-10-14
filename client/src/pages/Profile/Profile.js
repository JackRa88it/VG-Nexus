import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "../../components/Grid"
import GameContainer from '../../components/GameContainer/'
import API from '../../utils/API'
import Authenticator from '../../utils/Authenticator';
import "./Profile.css";
var moment = require('moment')

class Profile extends Component
{
  state = {
    id: undefined,
    postBanner: "",
    username: "",
    createdAt: undefined,
    bio: "",
    random: [], // TODO: this shouldn't be random, it should be their uploads
  }
  componentDidMount()
  {

      // userID won't change
      const userId = this.props.match.params.id;

      API.getUser(userId)
        .then(user =>
        {
          // console.log(user);
          // console.log(user.data);
          this.setState({
            id: user.data.id,
            username: user.data.username,
            postBanner: user.data.postBanner,
            createdAt: user.data.createdAt,
            bio: user.data.bio
          })
        })
        .catch(err =>
        {
          console.log(err)
        })
 
    this.getRandom();
  }
  getRandom()
  {
    API.getRandom()
      .then((res) =>
      {
        this.setState({ random: res.data })
      })
      .catch((err) =>
      {
        console.log(err)
      })
  }
  render()
  {
    return (
      <div>
          <div>
            <Row>
              <Col size="md-4">

               <Row> 
                  <div className='media my-4'>
                    <div class="align-self-center imgwrap avatar mr-3">
                        <img className="bg-light border mr-3 " src={`/assets/userThumbnails/${this.state.id}`} alt={`pic-${this.state.id}`} />
                    </div>
                    <div className="pt-4 media-body px-4 ml-2">
                      <span className="bigger">{this.state.username}</span>
                      <div className='smaller'>Joined: {moment(this.state.createdAt).fromNow()}</div>
                    </div>
                  
                 </div>
                </Row>
              </Col>
              <Col size="md-7" off>
                <div className="mx-1 mt-4">
                  About<hr className='bg-white' />
                  <p id='bio' className="">
                    {this.state.bio}
                  </p>
                  <div className='text-secondary display-5 mt-3 float-left'><em> "{this.state.postBanner}" </em></div>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="mx-auto h-10 mt-4">
                <GameContainer games={this.state.random} header={'User Uploads'} className="fullWidth p-5" />
              </div>
            </Row>
        </div>
       </div>);
  }
}
export default Profile;