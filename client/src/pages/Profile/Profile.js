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
                  <div className='d-inline-block bg-standard'>
                    <div class="imgwrap mx-auto mt-4 mb-2">
                        <img className="bg-light border mr-3 mt-3 avatar" src={`/assets/userThumbnails/${this.state.id}`} alt={`pic-${this.state.id}`} />
                    </div>
                    <div className="float-right py-4  px-4 ml-2">
                      <span className="bigger">{this.state.username}</span>
                      <div className='smaller'>Created: {moment(this.state.createdAt).fromNow()}</div>

                    </div>
                  
                 </div>
                </Row>
              </Col>
              <Col size="md-8">
                <div className="mt-4">
                  About<hr className='bg-white' />
                  <p id='bio' className="float-right">
                    {this.state.bio}
                  </p>
                  <div className=' text-secondary display-5 mt-3 float-left'><em> "{this.state.postBanner}" </em></div>
                </div>

              </Col>
            </Row>
            <Row>
              <div className="mx-auto mt-5 pt-3">
                <GameContainer games={this.state.random} header={'User Uploads'} className="fullWidth py-2" />
              </div>
            </Row>
        </div>
       </div>);
  }
}
export default Profile;