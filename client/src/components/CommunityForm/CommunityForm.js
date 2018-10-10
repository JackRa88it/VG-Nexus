import React from "react";
import "./CommunityForm.css";
import API from "../../utils/API";

// 1) set up to add a post to a thread <-- IP
// 2) add edit post
// 3) add create thread
// 4) add navigate to this form from Community page
// 5) validate user at appropriate points

class CommunityForm extends React.Component {
  state = {
    text: ""
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.text) {
      let newPost = {};
      newPost.userId = 1;
      newPost.threadId = this.props.threadId;
      newPost.text = this.state.text;
      API.submitNewPost(newPost);
    } else {
      this.setState({
        text: "Enter text..."
      })
    }
  };

  render() {
    if (this.props.formType === 'newPost') {
      return (
        <div>
          <form className="form">
            <input
              value={this.state.text}
              name="text"
              onChange={this.handleInputChange}
              type="text"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      );
    }
  }
}

export default CommunityForm;
