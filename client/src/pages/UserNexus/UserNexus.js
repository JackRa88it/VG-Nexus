import React from 'react';
// import tabs
import Tabs from "../../components/UserNexus/Tabs"
// import editprofile
// import EditProfile from "../../components/UserNexus/EditProfile"
// import editgames
// import EditGame from "../../components/UserNexus/EditGame"
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Container } from "../../components/Grid"
import API from "../../utils/API";
import Authenticator from '../../utils/Authenticator';

// Refer to this image for what edit profile looks like: https://i.imgur.com/iaBGqD1.jpg
class UserNexus extends React.Component {
  state = {
    location: "Edit Profile",
    Username: "",
    Banner: "",
    Bio: ""
  };

  handleTabClick = (event) => {
    console.log(event)
    console.log("============")
    console.log("Tab Clicked")
    console.log("============")
    const name = (event.target.getAttribute("name"))
    const value = (event.target.getAttribute("value"))
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    })
    console.log(this.state.location);
  };

  handleSubmitEditProfile = (event) =>{
    if(Authenticator.isAuthenticated){    
      let editedUser = {}
      editedUser.id = Authenticator.user.id
      editedUser.Username = this.state.Username
      editedUser.Banner = this.state.Banner
      editedUser.Bio = this.state.Bio
      API.editUser(editedUser)
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

  render() {

    if (this.state.location === "Edit Profile") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Edit Profile</h1>
          <Row>
            {/* Left column */}
            <Col size="md-6">
              <div className="mr-4">
                <div>
                  <Input
                    name="Username"
                    placeholder="Current username text here"
                    onChange = {this.handleInputChange}
                  />
                  <Input
                    name="Banner"
                    placeholder="Current User Banner Text here"
                    onChange = {this.handleInputChange}
                  />
                  <Input
                    name="Bio"
                    placeholder="Current User Bio Text here"
                    onChange = {this.handleInputChange}
                  />

                  <FormBtn onClick ={this.handleSubmitEditProfile}>
                    Submit
                  </FormBtn>
                  <h2 className="display-5 mb-4">Uploading Images</h2>
                  <FormBtn>
                    Upload avatar image
                  </FormBtn>
                  <FormBtn>
                    Upload banner image
              </FormBtn>
                </div>
              </div>
            </Col>
            {/* Right column */}
            <Col size="md-6">
              <div className="ml-5">
                {/* Avatar image on this line */}
              </div>
            </Col>
          </Row>
        </div>
      )
    }
    else if (this.state.location === "Game") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Game</h1>
        </div>
      )
    }
    else if (this.state.location === "Posts") {
      return (
        <div>
          <Tabs handleTabClick={this.handleTabClick} />
          <h1>Posts</h1>
        </div>
      )
    }
  };
};


export default UserNexus;
// export default UserNexusGames;
// export default UserNexusPosts



