import React, { Component } from "react";
import HomeContainer from "./HomeContainer";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../components/Navbar";
import LoginContainer from "../components/LoginContainer"
import SignUpContainer from "../components/SignUpContainer"
import MovieDetails from "../components/MovieDetails";
class MainApp extends Component {
  render() {
    return (
      <BrowserRouter>
     <div>

      <Route path="/login" component={LoginContainer}/>
      <Route path="/signup" component={SignUpContainer}/>
      <Route path="/home" component={NavBar}/>
      <Route path="/home" component={HomeContainer} />
      <Switch>
      <Route path={"/movie/:id"} component={MovieDetails}></Route>
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
