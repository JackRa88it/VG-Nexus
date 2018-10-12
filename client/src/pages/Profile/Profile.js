import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Row, Col} from "../../components/Grid"
import GameContainer from '../../components/GameContainer/'
import API from '../../utils/API'
import Authenticator from '../../utils/Authenticator';
import "./Profile.css";

class Profile extends Component {
  state = {
    username: '',
    user: {},
    authenticated: false,
    random: []
  }
  componentDidMount() {
    Authenticator.authenticate(() => {
      this.setState({ authenticated: true,
         username:  Authenticator.username,
         user: Authenticator.user,
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
              {(this.state.authenticated ?
              <div>
                <Row>
                  <Col size="md-4">
                    <img src={`/assets/userThumbnails/${this.state.user.id}`} alt='user image' />
                    <h2>{this.state.username}</h2>
                    <h3>{this.state.user.postBanner}</h3>
                  </Col>
                  <Col size="md-4">
                  <p className="float-right px-4">About<br />
                  {this.state.user.bio}
                  </p>
                  </Col>
              </Row>
              <Row>
                <div className="d-flex w-100 justify-content-end">
                  <GameContainer games={this.state.random} header={'Your Uploads'}  />
                </div>
              </Row>

              </div>:
            <h2 className="text-center">Sign up for your own profile page!</h2>
            )}

            <Col size="md-auto">
            </Col>
          <Row>
          </Row>          
      </div>
    )
  }
}
export default Profile;