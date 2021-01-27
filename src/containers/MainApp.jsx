import React, { Component } from "react";
import HomeContainer from "./HomeContainer";
import {BrowserRouter, Route, Switch } from "react-router-dom";


import MovieDetails from "../components/MovieDetails";
import UserProfile from '../components/userProfile/UserProfile'
import SearchContainer from  "../components/SearchContainer"
import NavBar from "../components/Navbar";
class MainApp extends Component {
  


  
  render() {
    return (
      <BrowserRouter>
     <div>
     <NavBar/>

    
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
