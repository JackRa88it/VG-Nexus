// import "./App.css";
import React, { Component } from 'react';
import Form from './pages/UploadForm';
import Game from './components/Game/Game';
import LoginSignup from "./pages/LoginSignup";
import Signup from "./pages/LoginSignup/Signup";
import NavTabs from "./components/Nav";
import {Container} from "./components/Grid";
import Footer from "./components/Footer"
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ChooseGame from "./pages/ChooseGame/ChooseGame";
import ChooseUser from "./pages/ChooseUser/ChooseUser";
import Community from "./pages/Community/Community";
import UserNexus from "./pages/UserNexus/UserNexus";
import AllGames from "./pages/AllGames/AllGames"
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
          <Route path="/all" component={ChooseGame} />
          <Route path="/browse" component={AllGames} />
          <Route exact path="/upload" component={Form} />
          <Route exact path="/game" component={Game} />
          <Route exact path='/login_signup' component={LoginSignup} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/community' component={Community} />
          <Route path='/UserNexus/:location' component={UserNexus} />
          <Route path={'/profile'} component={ChooseUser}/>
          {/*<Route exact path="/profile/:id" component={Profile} />   */}          
          <Route exact path="/about" component={About} />
        </Container>
        <Footer />
      </div>
    </Router>

    );
  }
}

export default App;

