import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieContainer from "./MovieContainer";
import MovieDetails from "../components/MovieDetails";
import FolloweeReviews from "../components/home/FolloweeReviews";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: 50,
    height: 0,
    
  },
}));

class HomeContainer extends Component {
  render() {
    return (
      <Paper>
      <div>
            
        <BrowserRouter>
       
          <div>
            <Route path="/home" component={MovieContainer}></Route>
            
            <Switch>
              <Route path={"/movie/:id"} component={MovieDetails}></Route>
            </Switch>
             
          
          </div>
         
        </BrowserRouter>
         
      </div>
      </Paper>
    );
  }
}

export default HomeContainer;
