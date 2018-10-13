const React = require('react')

class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  render() {
    return (
      <div>
        <input type="file" name={this.props.name} onChange={this.handleChange}/>
        {this.state.file.length ? <img src={this.state.file} alt='upload-thumbnail' id='uploadThumbnail'  /> : null}
      </div>
    );
  }
}

module.exports = Upload