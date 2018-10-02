import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <iframe src='/user/Phaser-SRPG/index.html'></iframe>

        <form action="http://localhost:3001/upload" method="post" encType="multipart/form-data">
        <input type="file" name="filetoupload" /><br />
        <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
