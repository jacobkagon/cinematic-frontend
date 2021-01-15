import React, { Component } from "react";
import HomeContainer from "./HomeContainer";
import { Route } from "react-router-dom";
import NavBar from "../components/Navbar";

class MainApp extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route path="/home" component={HomeContainer} />
      </div>
    );
  }
}

export default MainApp;
