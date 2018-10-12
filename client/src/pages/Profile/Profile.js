import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Row, Col} from "../../components/Grid"
import GameContainer from '../../components/GameContainer/'
import API from '../../utils/API'
import Authenticator from '../../utils/Authenticator';
import "./Profile.css";
var moment = require('moment')

class Profile extends Component {
  state = {
    user: {},
    username: "",
    random: []
  }
  componentDidMount() {
    Authenticator.authenticate(() => {
      API.getUser(Authenticator.user.id)
      .then(user =>{
        this.setState({
          user: user.data,
          username: user.data.username
        })
      })
      .catch(err => {
        console.log(err)
      })
      
     
    })
    this.getRandom();
  }
  getRandom(){
    API.getRandom()
    .then((res)=>{
      this.setState({random:res.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){ 
    return (
      <div>
              {(Authenticator.isAuthenticated ?
              <div>
                <Row>
                  <Col size="md-4">
                    <img src={`/assets/userThumbnails/${this.state.user.id}`} alt='user pic' />
                    <h2>{this.state.user.username}</h2> 
                    <div className='display-5'>{this.state.user.postBanner}</div>
                    <div className='display-7'>Created: {moment(this.state.user.createdAt).fromNow()}</div>
                  </Col>
                  <Col size="md-8">
                  About<hr className='bg-white' />
                    <p className="float-right">
                      {this.state.user.bio}
                    </p>
                    
                  </Col>
              </Row>
              <Row>
                <div className="ml-auto">
                 <GameContainer games={this.state.random} header={'Your Uploads'} className="fullWidth" />
                </div>
              </Row>

              </div>:
            <h2 className="text-center">Sign up for your own profile page!</h2>
            )}        
      </div>
    )
  }
}
export default Profile;