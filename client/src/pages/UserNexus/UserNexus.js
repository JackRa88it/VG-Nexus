import React from 'react';
import Tabs from "../../components/UserNexus/Tabs"
import Posts from "../../components/UserNexus/Posts"
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Container } from "../../components/Grid"
import GameList from '../../components/GameList';
import API from "../../utils/API";
import Authenticator from '../../utils/Authenticator';
import EditProfile from "../../components/EditProfile/EditProfile";
import "./UserNexus.css";

// Refer to this image for what edit profile looks like: https://i.imgur.com/iaBGqD1.jpg
class UserNexus extends React.Component {
  state = {
    location: "",
    Games: [],
  };

  componentDidMount() {
    Authenticator.authenticate(() => {
      this.getUserGames();
      if(this.props.match.params.location) {
        this.setState({
          location: this.props.match.params.location,
        })
      }
      else {
        this.setState({
          location: "EditProfile"
        })
      }
    })
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
    this.setState({
      [name]: value
    })
    if(value == 'Games'){
      this.getUserGames();
    }
  };

  render() {
    if (this.state.location === "EditProfile") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <EditProfile />
        </div>
      )
    }
    else if (this.state.location === "Games") {
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
    else {
      return null;
    }
  };
};


export default UserNexus;
// export default UserNexusGames;
// export default UserNexusPosts



