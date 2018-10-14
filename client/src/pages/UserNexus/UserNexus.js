import React from 'react';
import Tabs from "../../components/UserNexus/Tabs"
import Posts from "../../components/UserNexus/Posts"
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Container } from "../../components/Grid"
import GameList from '../../components/GameList';
import API from "../../utils/API";
import Authenticator from '../../utils/Authenticator';
import AvatarUpload from "./AvatarUpload";
import "./UserNexus.css";

// Refer to this image for what edit profile looks like: https://i.imgur.com/iaBGqD1.jpg
class UserNexus extends React.Component {
  state = {
    location: "Edit Profile",
    Username: "",
    Banner: "",
    Bio: "",
    Games: []
  };


  formPopulate = ()=>{
    if(Authenticator.isAuthenticated){
      API.getUser(Authenticator.user.id)
      .then(res => {
        this.setState({
          Username: res.data.username,
          Banner: res.data.postBanner,
          Bio: res.data.bio
        })
      })
    }
  }

  deleteHandler = (gameId) => {
    API.deleteGame(gameId)
    .then((res)=>{
      this.getUserGames(Authenticator.user.id)
    })
  }

  getUserGames() {
    API.getUserGames(Authenticator.user.id)
      .then(res => {
        this.setState({ Games: res.data });
      });
  }

  handleTabClick = (event) => {
    const name = (event.target.getAttribute("name"))
    const value = (event.target.getAttribute("value"))
    console.log(name)
    console.log(value)

    this.setState({
      [name]: value
    })
    if(value == 'Game'){
      this.getUserGames();
    }
    console.log(this.state.location);
  };

  handleSubmitEditProfile = (event) =>{
    event.preventDefault();
    if(Authenticator.isAuthenticated){
      const formData = new FormData(event.target);
      let userId = Authenticator.user.id
      formData.append("userId", userId)
      API.editProfile(formData)
      .then(res => {
        console.log(res)
        window.location.assign("/profile/"+Authenticator.user.id)
      })
      .catch(err => {
        console.log(err)
      })

  };
  }
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };



  componentDidMount(){
    this.formPopulate()
  }

  render() {

    if (this.state.location === "Edit Profile") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <form encType="multipart/form-data" id="editProfileForm" onSubmit={this.handleSubmitEditProfile}>
            <h3>Edit Profile</h3>
            <hr />
            <span>User avatar:</span>
            <div id="formAvatarContainer">
              <AvatarUpload
                name="Avatar"
              / >
  
            </div>
            <br></br>
            <p>username:</p>
            <Input
              name="Username"
              value={this.state.Username}
              onChange = {this.handleInputChange}
            />
            <p>bio:</p>
            <textarea
              name="Bio"
              value={this.state.Bio}
              onChange = {this.handleInputChange}
            />
            <p>forum post banner:</p>
            <textarea
              name="Banner"
              value={this.state.Banner}
              onChange = {this.handleInputChange}
            />
            <br></br>
            <br></br>
            <input className="nexus-button" type="submit" />
          </form>
        </div>
      )
    }
    else if (this.state.location === "Game") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Game</h1>
          <GameList games = {this.state.Games} owner={true} deleteHandler={this.deleteHandler}/>
        </div>
      )
    }
    else if (this.state.location === "Posts") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Posts</h1>
          <Posts/>
        </div>
      )
    }
  };
};


export default UserNexus;
// export default UserNexusGames;
// export default UserNexusPosts



