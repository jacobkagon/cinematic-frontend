import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "../components/MovieDetails";
import FolloweeReviews from "../components/home/FolloweeReviews"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
img: {
maxWidth: 100,
height: 50,
}
}))


class HomeContainer extends Component {




  render() {
    return (
    <div>
    
     <BrowserRouter>
      <div>
     
      
      
     
        <Route path='/home' component={MovieContainer}></Route>
          <Switch>
          <Route path={"/movie/:id"} component={MovieDetails}></Route>
          </Switch>
        
      </div>
      </BrowserRouter>
      <a href='https://www.themoviedb.org/' target="_blank">
      <img align='right' width='50' src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"/>
      </a>
      </div>
    );
  }
}

export default HomeContainer;
