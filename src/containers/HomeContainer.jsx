import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "../components/MovieDetails";
import FolloweeReviews from "../components/home/FolloweeReviews"



class HomeContainer extends Component {
  render() {
    return (
    <div>
    
     <BrowserRouter>
      <div>
     
      
        <Route path='/home' component={MovieContainer}></Route>
        <Route path='/home' component={FolloweeReviews}></Route>
          <Switch>
          
          <Route path={"/movie/:id"} component={MovieDetails}></Route>
          </Switch>
        
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default HomeContainer;
