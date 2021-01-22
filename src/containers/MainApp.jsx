import React, { Component } from "react";
import HomeContainer from "./HomeContainer";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../components/Navbar";
import LoginContainer from "../components/LoginContainer"
import SignUpContainer from "../components/SignUpContainer"
import MovieDetails from "../components/MovieDetails";
import UserProfile from '../components/userProfile/UserProfile'
import SearchContainer from  "../components/SearchContainer"

class MainApp extends Component {
  

  handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("username", userData.username);
  };
  
  render() {
    return (
      <BrowserRouter>
     <div>
     <NavBar/>
      <Route path="/login" component={(props) => (
            <LoginContainer {...props} handleUser={this.handleUser} />
          )}/>
      <Route path="/signup" component={(props) => (
            <SignUpContainer {...props} handleUser={this.handleUser}/> )}/>
      {/* <Route path="/home" component={NavBar}/> */}
      <Route path="/home" component={HomeContainer} />
      <Switch>
      <Route path={"/movie/:id"} component={MovieDetails}></Route>
      <Route path={'/:username/:user_id'} component={UserProfile}></Route>
      <Route path='/search' component={SearchContainer}/>
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
