import React from "react";
import "./CommunityForm.css";
import Authenticator from "../../utils/Authenticator";

class CommunityForm extends React.Component {
  state = {
    text: ""
  };

  componentDidMount() {
    if (this.props.formType === 'newPost' || this.props.formType === 'newThread' ) {
      this.setState({
        text: ''
      })
    }
    else if (this.props.formType === 'editPost') {
      this.setState({
        text: this.props.postText
      })
    }
    else if (this.props.formType === 'editThread') {
      this.setState({
        // text: 'NOT CODED YET'
      })
    }
  }

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
      if (this.props.formType === 'newPost') {
        let newPost = {};
        newPost.userId = Authenticator.user.id;
        newPost.threadId = this.props.threadId;
        newPost.text = this.state.text;
        this.props.submitNewPost(newPost);
      } 
      else if (this.props.formType === 'editPost') {
        let editedPost = {};
        editedPost.id = this.props.postId;
        editedPost.text = this.state.text;
        editedPost.threadId = this.props.threadId;
        this.props.submitEditedPost(editedPost);
      }
      else if (this.props.formType === 'newThread') {
        let newThread = {};
        newThread.userId = Authenticator.user.id;
        newThread.forumId = this.props.forumId;
        newThread.title = this.state.text;
        this.props.submitNewThread(newThread);
      }
    } 
    else {
      this.setState({
        text: "Enter text..."
      })
    }
  };

  render() {
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

export default CommunityForm;
