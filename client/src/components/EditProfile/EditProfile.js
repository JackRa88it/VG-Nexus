import React from 'react';
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Container } from "../../components/Grid"
import API from "../../utils/API";
import Authenticator from '../../utils/Authenticator';
import AvatarUpload from "./AvatarUpload";

class EditProfile extends React.Component {

  state = {
    Username: "",
    Banner: "",
    Bio: ""
  }

  formPopulate = ()=>{
    if(Authenticator.isAuthenticated){
      API.getUser(Authenticator.user.id)
      .then(res => {
        this.setState({
          Username: res.data.username,
          Banner: res.data.postBanner,
          Bio: res.data.bio,
        })
      })
    }
  }

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
    }
  };

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
    return (
      <div>
        <form encType="multipart/form-data" id="editProfileForm" onSubmit={this.handleSubmitEditProfile}>
          <h3>Edit Profile</h3>
          <hr />
          <p>avatar image:</p>
          <div id="formAvatarContainer">
            <AvatarUpload
              name="Avatar"
              // AvatarUpload cannot get Authenticator.user if navigating to /UserNexus directly in the url bar
            >
              Upload avatar image
            </AvatarUpload>
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

}

export default EditProfile;