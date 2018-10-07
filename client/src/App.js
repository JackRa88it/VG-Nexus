import React, { Component } from 'react';
import Form from './components/UploadForm/Form'
import Game from './components/Game/Game'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import LoginSignup from "./pages/LoginSignup"
import NavTabs from "./components/NavTabs";
import {Container} from "./components/Grid";
import Chatroom from "./components/Chat/gameChat"
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ChooseGame from "./pages/ChooseGame/ChooseGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <NavTabs />
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/all" component={ChooseGame} />
          <Route exact path="/upload" component={Form} />
          <Route exact path="/game" component={Game} />
          <Route exact path='/login_signup' component={LoginSignup} />

          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
<<<<<<< HEAD
=======
          <Route exact path='/chat' component={DirectMessage} />
          <Route exact path="/chatRoom" component={Chatroom} />

>>>>>>> c5c3cc01a831e04670effc3e89423926819e239f
        </Container>
      </div>
    </Router>

    );
  }
}

export default App;

