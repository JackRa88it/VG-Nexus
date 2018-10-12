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
      <div className="communityForm">
        <h4>{this.props.formType === 'newThread' ? "Thread Title:" : "Post Text:"}</h4>
        <textarea
          value={this.state.text}
          name="text"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleFormSubmit}>Submit</button>
      </div>
    );
  }
}

export default CommunityForm;
